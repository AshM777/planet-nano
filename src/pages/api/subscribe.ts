import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { email } = data;

    if (!email || !email.includes('@')) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Invalid email address' 
        }),
        { status: 400 }
      );
    }

    const publication = import.meta.env.SUBSTACK_PUBLICATION;
    if (!publication) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Substack publication not configured' 
        }),
        { status: 500 }
      );
    }

    // Use Substack's API to subscribe the user
    const substackUrl = `https://${publication}.substack.com/api/v1/free`;
    
    try {
      const response = await fetch(substackUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          redirect: false // Prevent automatic redirect
        })
      });

      if (response.ok) {
        return new Response(
          JSON.stringify({ 
            success: true, 
            message: 'Successfully subscribed' 
          }),
          { status: 200 }
        );
      } else {
        const errorData = await response.json().catch(() => ({}));
        return new Response(
          JSON.stringify({ 
            success: false, 
            message: errorData.error || 'Failed to subscribe. Please try again.' 
          }),
          { status: 400 }
        );
      }
    } catch (error) {
      console.error('Substack API error:', error);
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Failed to connect to Substack' 
        }),
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in subscribe endpoint:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: 'Server error' 
      }),
      { status: 500 }
    );
  }
}; 