import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { HfInference } from 'https://esm.sh/@huggingface/inference@2.3.2'

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

    if (!prompt && !imageData) {
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

    const hf = new HfInference(hfToken)

    let image;
    
    if (imageData) {
      // Convert uploaded photo to AI-generated style
      console.log('Processing uploaded image for AI conversion')
      const enhancedPrompt = `Transform this into a beautiful AI-generated portrait, ${prompt || 'elegant and classy style'}, professional photography, high quality, detailed face, soft lighting, photorealistic, studio lighting`
      
      // Use image-to-image generation for photo conversion
      image = await hf.imageToImage({
        inputs: imageData,
        parameters: {
          prompt: enhancedPrompt,
          guidance_scale: 7.5,
          num_inference_steps: 20,
          strength: 0.8 // Higher strength for more transformation
        },
        model: 'runwayml/stable-diffusion-v1-5'
      })
    } else {
      // Text-to-image generation
      console.log('Generating image from text prompt')
      const enhancedPrompt = `Portrait of a beautiful woman, ${prompt}, professional photography, high quality, detailed face, soft lighting, elegant pose, photorealistic, studio lighting, 8k resolution`

      image = await hf.textToImage({
        inputs: enhancedPrompt,
        model: 'black-forest-labs/FLUX.1-schnell',
        parameters: {
          guidance_scale: 3.5,
          num_inference_steps: 4,
          width: 512,
          height: 512
        }
      })
    }

    // Convert the blob to a base64 string
    const arrayBuffer = await image.arrayBuffer()
    const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)))

    return new Response(
      JSON.stringify({ 
        image: `data:image/png;base64,${base64}`,
        prompt: prompt
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