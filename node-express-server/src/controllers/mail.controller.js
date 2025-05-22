const emailService = require('../services/email.service');
const userService = require('../services/user.service');
const clubService = require('../services/club.service');

const sendMail = async (req, res) => {
  try {
    const { recipients, subject, message } = req.body;
    
    // Get the sender's information
    const sender = req.user;
    
    let userEmails = [];
    
    // If sending to all users
    if (recipients === 'all') {
      const users = await userService.query();
      userEmails = users.map(user => user.email);
    } else {
      // If sending to specific club members
      const club = await clubService.get(recipients);
      if (!club) {
        return res.status(404).json({ message: 'Club not found' });
      }
      
      // Get all members of the club
      const members = await userService.query({ clubId: recipients });
      userEmails = members.map(member => member.email);
    }

    // Send email to each user
    for (const email of userEmails) {
      await emailService.sendEmail(
        email,
        subject,
        `From: ${sender.name} (${sender.email})\n\n${message}`
      );
    }

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email', error: error.message });
  }
};

module.exports = {
  sendMail
};
