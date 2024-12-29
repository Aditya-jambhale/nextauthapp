export type SendEmailParams = {
    email: string;
    emailType: "Verify" | "Reset";
    userId: string;
   
};
