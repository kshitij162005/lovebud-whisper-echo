import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { prompt, imageData } = await req.json()
    console.log('Request received:', { hasPrompt: !!prompt, hasImageData: !!imageData })

    if (!prompt && !imageData) {
      console.error('Missing required data')
      return new Response(
        JSON.stringify({ error: 'Prompt or image data is required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    const hfToken = Deno.env.get('HUGGING_FACE_ACCESS_TOKEN')
    if (!hfToken) {
      console.error('HUGGING_FACE_ACCESS_TOKEN not found')
      return new Response(
        JSON.stringify({ error: 'API configuration error' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      )
    }

    console.log('Using HuggingFace token available')
    
    // For now, let's use a simple approach that works
    const enhancedPrompt = imageData 
      ? `Transform this into a beautiful AI-generated portrait, ${prompt || 'elegant and classy style'}, professional photography, high quality, detailed face, soft lighting, photorealistic, studio lighting`
      : `Portrait of a beautiful woman, ${prompt}, professional photography, high quality, detailed face, soft lighting, elegant pose, photorealistic, studio lighting, 8k resolution`

    console.log('Making request to HuggingFace API with prompt:', enhancedPrompt)

    // Use fetch directly to HuggingFace API for better error handling
    const response = await fetch('https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${hfToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: enhancedPrompt,
        parameters: {
          width: 512,
          height: 512,
          num_inference_steps: 4
        }
      })
    })

    console.log('HuggingFace API response status:', response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error('HuggingFace API error:', errorText)
      throw new Error(`HuggingFace API error: ${response.status} ${errorText}`)
    }

    const imageBlob = await response.blob()
    const arrayBuffer = await imageBlob.arrayBuffer()
    const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)))

    console.log('Successfully generated image, base64 length:', base64.length)

    return new Response(
      JSON.stringify({ 
        image: `data:image/png;base64,${base64}`,
        prompt: enhancedPrompt
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error generating image:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to generate image', details: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})