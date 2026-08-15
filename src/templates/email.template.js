const otpEmailTemplate = (otp,userName) =>`

        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
            <h2>Email Verification</h2>

            <p>Hello, ${userName}</p>

            <p>We received a request to verify your email address.</p>

            <p>Your One-Time Password (OTP) is:</p>

            <h1 style="letter-spacing:5px; color:#2563eb;">
                ${otp}
            </h1>

            <p>This OTP is valid for <strong>5 minutes</strong>.</p>

            <p><strong>Do not share this OTP with anyone.</strong></p>

            <hr>

            <p>If you didn't request this verification, you can safely ignore this email.</p>

            <p>Thanks,<br>Todo List Team</p>
        </div>
    `;

    const passwordResetEmailTemplate=(userName,otp)=> `
    <div style="
        font-family: Arial, Helvetica, sans-serif;
        max-width: 600px;
        margin: auto;
        padding: 20px;
        color: #333;
        line-height: 1.6;
    ">

        <h2 style="color: #111827;">
            Password Reset
        </h2>

        <p>Hello, ${userName}</p>

        <p>
            We received a request to reset the password for your account.
        </p>

        <p>
            Your One-Time Password (OTP) is:
        </p>

        <h1 style="
            letter-spacing: 6px;
            color: #2563eb;
            font-size: 32px;
            margin: 20px 0;
        ">
            ${otp}
        </h1>

        <p>
            This OTP is valid for <strong>5 minutes</strong>.
        </p>

        <p>
            <strong>Do not share this OTP with anyone.</strong>
        </p>

        <hr style="
            border: none;
            border-top: 1px solid #e5e7eb;
            margin: 25px 0;
        ">

        <p style="font-size: 14px; color: #666;">
            If you didn't request a password reset, you can safely ignore
            this email. Your password will remain unchanged.
        </p>

        <p>
            Thanks,<br>
            <strong>Todo List Team</strong>
        </p>

    </div>
`;
export {otpEmailTemplate,passwordResetEmailTemplate}