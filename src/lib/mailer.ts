import nodemailer from 'nodemailer';
import { PATH } from 'config/const';

function sendEmail(message) {
  return new Promise((res, rej) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      },
      secure: true,
    })

    transporter.sendMail(message, function (err, info) {
      if (err) {
        rej(err)
      } else {
        res(info)
      }
    })
  })
}

export const sendResetPasswordEmail = ({ toCustomer, token }) => {
  const message = {
    from: 'customercare@mori.com',
    // from: process.env.EMAIL_USERNAME,
    to: toCustomer.email,
    subject: 'Customer profile password reset',
    html: `
      <h1>Mori</h1>
<!--       <hr style="border-top:1px solid #eaeaea">-->
      <p>Hi ${toCustomer.name},</p>
      <p>We've received a request to reset the password for the Mori account asscociated with ${toCustomer.email}.
       No changes have been made to your account yet.
       </p>
      <p>You can reset your password by click the link below:
      <button style="
              border-radius: 0.5rem;
              background-color: black;
              color: white;
              border: 0 solid #e5e7eb;
              padding: 1rem;
              font-size: 0.875rem;
              text-align: center;
              cursor:pointer;
              display: flex;
              align-items: center;
              height: 40px;
              margin-top: 10px;
              justify-content: center;
      "
              onmouseover="this.style.color='white'"
              onmouseout="this.style.opacity='0.8'"
      >
            <a target="_" href="${process.env.DOMAIN}${PATH.ACCOUNT.RESET_PASSWORD}/${token}/${toCustomer._id}">Reset Password Link</a></p>
      </button>
      <p>If you didn't request a password reset, you can ignore this email.</p>
      <p>You can find answers to most questions and get in touch with us at
      <span style="color: #373530; text-underline: #dfdfde"> support.mori.com </span>.
       We're here
       to help you at any step along the way.
       </p>
      <p>--- Mori Team</p>
<!--       <hr style="border-top:1px solid #eaeaea">-->
<!--       <p style="font-size: 13px; color: #abb4c1;-->
<!--       ">Mori, 510 Townsend Street, San Francisco, CA94103</p>-->
    `
  }
  return sendEmail(message);
}

export const sendSetPassword = ({ toCustomer, token }) => {
  const message = {
    from: 'customercare@mori.com',
    // from: process.env.EMAIL_USERNAME,
    to: toCustomer.email,
    subject: 'Set your password',
    html: `
      <h1>Mori</h1>
<!--       <hr style="border-top:1px solid #eaeaea">-->
      <p>Hi ${toCustomer.name},</p>
      <p>Thank u for order ....</p>
      <p>u can review orders after set password for ur account ( email: ${toCustomer.email} )</p>
      <p>You can set your password by click the link below:
      <button style="
              border-radius: 0.5rem;
              background-color: black;
              color: white;
              border: 0 solid #e5e7eb;
              padding: 1rem;
              font-size: 0.875rem;
              text-align: center;
              cursor:pointer;
              display: flex;
              align-items: center;
              height: 40px;
              margin-top: 10px;
              justify-content: center;
      "
              onmouseover="this.style.color='white'"
              onmouseout="this.style.opacity='0.8'"
      >
            <a target="_" href="${process.env.DOMAIN}${PATH.ACCOUNT.RESET_PASSWORD}/${token}/${toCustomer._id}">Reset Password Link</a></p>
      </button>
      <p>You can find answers to most questions and get in touch with us at
      <span style="color: #373530; text-underline: #dfdfde"> support.mori.com </span>.
       We're here
       to help you at any step along the way.
       </p>
      <p>--- Mori Team</p>
<!--       <hr style="border-top:1px solid #eaeaea">-->
<!--       <p style="font-size: 13px; color: #abb4c1;-->
<!--       ">Mori, 510 Townsend Street, San Francisco, CA94103</p>-->
    `
  }
  return sendEmail(message);
}

export const sendResultRegister = ({ email }) => {
  const message = {
    from: process.env.EMAIL_USERNAME,
    to: email,
    subject: 'Customer profile confirmation',
    html: `
      <h1>Mori</h1>
      <h3>Welcome to Mori store,</h3>
      <p>You've activated your customer account. Next time you shop with us, log in for faster checkout. </p>
      <p>If you have any questions, reply to this email or contact us at</p>
      <p>customercare@mori.com</p>
      <p>--- Mori Team</p>
    `
  }
  return sendEmail(message);
}
