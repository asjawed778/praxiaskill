export const courseAssignmentEmailTemplate = (
    userName: string,
    courseTitle: string,
    courseSubtitle: string,
    courseThumbnailUrl: string,
    courseLink: string
): string => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>New Course Assignment</title>
    <style>
      body {
        font-family: 'Arial', sans-serif;
        background-color: #f9f9f9;
        margin: 0;
        padding: 0;
        color: #333;
      }
      .container {
        max-width: 600px;
        margin: 40px auto;
        background: #ffffff;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        border: 3px solid #ED1C25;
      }
      .header {
        background-color: #ED1C25;
        color: #ffffff;
        text-align: center;
        padding: 20px 0;
      }
      .header h1 {
        margin: 0;
        font-size: 24px;
        letter-spacing: 1px;
      }
      .content {
        padding: 30px;
        font-size: 16px;
        line-height: 1.6;
        color: #444;
      }
      .content p {
        margin: 12px 0;
      }
      .label {
        font-weight: bold;
        color: #000;
      }
      .course-thumbnail {
        width: 100%;
        max-height: 200px;
        object-fit: cover;
        border-radius: 8px;
        margin: 15px 0;
        border: 1px solid #eee;
      }
      .button {
        display: inline-block;
        background-color: #ED1C25;
        color: white;
        text-decoration: none;
        padding: 12px 25px;
        border-radius: 5px;
        font-weight: bold;
        margin: 20px 0;
        text-align: center;
      }
      .footer {
        background-color: #f2f2f2;
        padding: 20px;
        text-align: center;
        font-size: 13px;
        color: #888;
      }
      .course-info {
        background-color: #f9f9f9;
        padding: 15px;
        border-radius: 8px;
        margin: 20px 0;
      }
    </style>
</head>
<body>
    <div class="container">
      <div class="header">
        <h1>New Course Assignment</h1>
      </div>
      <div class="content">
        <p>Dear ${userName},</p>
        <p>You've been enrolled in a new course. Here are the details:</p>
        
        <div class="course-info">
          ${courseThumbnailUrl ? `<img src="${courseThumbnailUrl}" alt="${courseTitle}" class="course-thumbnail">` : ''}
          <h2>${courseTitle}</h2>
          <p><span class="label">Subtitle:</span> ${courseSubtitle}</p>
        </div>
        
        <p>You can now access this course and start learning immediately.</p>
        
        <center>
          <a href="${courseLink}" class="button">Go to Course</a>
        </center>
        
        <p>If you have any questions about the course, please don't hesitate to contact us.</p>
        
        <p>Happy learning!<br>The PraxiaSkill Team</p>
      </div>
      <div class="footer">
        This message was sent to notify you about your new course assignment.
      </div>
    </div>
  </body>
</html>
`;