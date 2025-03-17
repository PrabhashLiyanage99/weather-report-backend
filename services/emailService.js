require("dotenv").config();
const nodemailer = require("nodemailer");
const User = require("../models/User");

// Debug: Check environment variables
console.log("Email User:", process.env.EMAIL_USER);
console.log("Email Pass:", process.env.EMAIL_PASS);

// Setup Nodemailer Transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
});

// Function to Send Email
const sendEmail = async (to, subject, html) => {
    try {
        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            html
        });
        console.log(`Email sent to ${to}:`, info.messageId);
    } catch (err) {
        console.error("Error sending email to", to, ":", err.message);
        throw err;
    }
};

// Function to Fetch Weather Report and Send Emails
const sendWeatherReport = async () => {
    try {
        console.log("Fetching users...");
        const users = await User.find();

        for (const user of users) {
            const lastThreeData = user.weatherData ? user.weatherData.slice(-3) : [];
            
            if (lastThreeData.length === 0) {
                console.log(`No weather data found for user: ${user.email}`);
                continue;
            }

            const emailContent = `
                <h2>Hourly Weather Report</h2>
                <p><strong>Location:</strong> ${user.location}</p>
                <ul>
                    ${lastThreeData.map(entry => `
                        <li>
                            <strong>Time:</strong> ${new Date(entry.date).toLocaleTimeString()}<br>
                            <strong>Temperature:</strong> ${entry.temperature}°C<br>
                            <strong>Weather:</strong> ${entry.weather}
                        </li>
                    `).join('')}
                </ul>`;

            console.log(`Email content for ${user.email}:`, emailContent);

            try {
                await sendEmail(user.email, `Weather Report for ${user.location}`, emailContent);
            } catch (emailError) {
                console.error(`Failed to send email to ${user.email}:`, emailError.message);
            }
        }
    } catch (error) {
        console.error("Error in sendWeatherReport:", error.message);
    }
};

// Schedule Weather Report Emails Every Hour
setInterval(async () => {
    console.log("Sending weather reports...");
    await sendWeatherReport();
}, 10* 60 * 1000); 
