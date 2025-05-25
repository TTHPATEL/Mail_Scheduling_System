# Mail Scheduling Feature

Live site is here: [Mailing Scheduler System](http://mailing-schedular-production.up.railway.app) 🌐

This project is a **Mail Scheduling Feature** built using **Next.js**. The application consists of both a **frontend UI** and a **backend server**.

## Frontend:
- On the **home page**, users can schedule emails by:
  - Selecting an email template 📑
  - Choosing a group of recipients 👥
  - Setting a time for the email to be sent ⏰
- After submitting the details, users are redirected to a page where they can:
  - View the list of scheduled emails 📋
  - Perform **CRUD operations** (Create, Read, Update, Delete) on the scheduled emails 🔄

-  Additionally, there are separate tabs/pages for:
    - **User Management** (to add users) 👤
    - **Template Management** (to add and manage templates) 📝

## Backend:
- The backend logic for email scheduling and sending is handled by a separate server.
- You can find the backend code in my [backend repository](https://github.com/TTHPATEL/Backend-mail-schedule) 🔧.
- The backend manages the scheduling process and ensures emails are sent to the selected group of users with the chosen template at the specified time 📧.
- **Nodemailer**: Used in the backend to send scheduled emails to recipients using selected templates 📧.
- **Moment**: Helps with handling timestamps and time zones, ensuring that emails are sent at the right time based on the user's schedule 🕒.
- **Cron**: Schedules a task to check every minute for any pending emails and sends them when their scheduled time arrives ⏰.

## Deployment:
- The project is deployed live using **Railway** for easy and accessible hosting 🚀.
