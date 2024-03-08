import { CollectionAfterChangeHook } from 'payload/types'
const OPERATION = 'create'
const SUBJECT = 'New contact submission'
export const newContactEmail: CollectionAfterChangeHook = async ({
  operation,
  doc,
  req
}) => {
  console.log('docas',doc)
  if (operation === OPERATION) {
    req.payload.sendEmail({
      to: doc.email,
      from: process.env.RESEND_SENDER_EMAIL,
      subject: SUBJECT,
      // html: ContactEmail({
      //   userName: doc.name,
      //   email: doc.email,
      //   subject: doc.subject,
      //   message:doc.message
      // })\
      html: `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Contact Form</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 0;
                        padding: 0;
                        background-color: #f4f4f4;
                    }
                    .container {
                        max-width: 600px;
                        margin: 20px auto;
                        padding: 20px;
                        background-color: #fff;
                        border-radius: 5px;
                        box-shadow: 0 0 10px rgba(0,0,0,0.1);
                    }
                    .form-group {
                        margin-bottom: 20px;
                    }
                    .form-group label {
                        display: block;
                        font-weight: bold;
                        margin-bottom: 5px;
                    }
                    .form-group span {
                        display: block;
                        padding: 10px;
                        font-size: 16px;
                        border: 1px solid #ccc;
                        border-radius: 5px;
                        box-sizing: border-box;
                        background-color: #f9f9f9;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h2>Contact Information</h2>
                    <div class="form-group">
                        <label for="name">${doc.name}</label>
                        <span>John Doe</span>
                    </div>
                    <div class="form-group">
                        <label for="email">Email:</label>
                        <span>${doc.email}</span>
                    </div>
                    <div class="form-group">
                        <label for="subject">Subject:</label>
                        <span>${doc.subject}</span>
                    </div>
                    <div class="form-group">
                        <label for="message">Message:</label>
                        <span>${doc.message}</span>
                    </div>
                </div>
            </body>
            </html>
`,
    })
  }
}
