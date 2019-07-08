module.exports = {

    confirm: id => ({
      subject: 'React Confirm Email',
      html: `
        <a href='http://localhost:3000/sendgrid/confirm/${id}'>
          click to confirm email
        </a>
      `,      
      text: `Copy and paste this link: ${CLIENT_ORIGIN}/confirm/${id}`
    })
    
  }