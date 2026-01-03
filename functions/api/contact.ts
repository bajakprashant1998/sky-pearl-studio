/// <reference types="@cloudflare/workers-types" />

interface Env {
    RESEND_API_KEY: string;
    RECAPTCHA_SECRET_KEY: string;
    CONTACT_TO_EMAIL: string;
    CONTACT_FROM_EMAIL: string;
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
    try {
        const { firstName, lastName, email, phone, message, captchaToken } = await request.json();

        if (!email || !message || !captchaToken) {
            return new Response(JSON.stringify({ error: "Invalid request" }), { status: 400 });
        }

        // 🔐 Verify reCAPTCHA
        const captchaRes = await fetch(
            "https://www.google.com/recaptcha/api/siteverify",
            {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: `secret=${env.RECAPTCHA_SECRET_KEY}&response=${captchaToken}`,
            }
        );

        const captchaData = await captchaRes.json();
        if (!captchaData.success) {
            return new Response(JSON.stringify({ error: "Captcha verification failed" }), { status: 403 });
        }

        // ✉️ Send email
        const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${env.RESEND_API_KEY}`,
            },
            body: JSON.stringify({
                from: `Dibull Contact <${env.CONTACT_FROM_EMAIL}>`,
                to: [env.CONTACT_TO_EMAIL],
                reply_to: email,
                subject: `New Inquiry from ${firstName} ${lastName}`,
                html: `
          <p><b>Name:</b> ${firstName} ${lastName}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Phone:</b> ${phone}</p>
          <p>${message}</p>
        `,
            }),
        });

        if (!res.ok) {
            const err = await res.text();
            console.error(err);
            return new Response(JSON.stringify({ error: "Email failed" }), { status: 500 });
        }

        return new Response(JSON.stringify({ success: true }), { status: 200 });

    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
    }
};