import nodemailer from 'nodemailer';

// configuramos el transporter de nodemailer para que use el servicio de gmail

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "helmanlourdes7@gmail.com",
        pass: "zyra jkbu czff wjyd"
    },
    from: "helmanlourdes7@gmail.com"
});

export const sendEmail =async (to: string, code: string): Promise<void> => {
// configuramos el email
    try {
        const mailOptions = {
            from: ' "Lourdes Helman" helmanlourdes7@gmail.com   ',
            to,
            subject: 'Codigo de verificacion para la creacion de tu cuenta',
            text: `Tu codigo de verificacion es: ${code}`
        }
        // enviamos el email
        await transporter.sendMail(mailOptions);
        console.log('Email enviado correctamente');

    } catch (error) {
        console.log("Error al enviar el email");
    }
}