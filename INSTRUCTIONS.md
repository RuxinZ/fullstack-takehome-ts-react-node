# Full-Stack Software Engineer Work Sample Specs

Please refer to the submission requirements to ensure you are using the correct tech stack: [Full-Stack Software Engineer Work Sample Preliminaries](https://www.notion.so/Full-Stack-Software-Engineer-Work-Sample-Preliminaries-9edc224d136443a682acec5daf9c7551?pvs=21)

## Specifications

You are tasked with creating a simple real-time collaborative text editor. A collaborative text editor is a text editor where more than one user can edit the text at the same time in real-time, similar to Google Docs.

**Requirements**

- The text editor should be as simple as possible.
  - It does not need rich text support.
  - You do not need to worry about synchronizing carets/selection/cursors from multiple users.
  - Persistence is optional - you do not need to save the text. You do not need to worry about databases.
  - It does not need any styling - it’s meant to be just functional.
  - You do not need to be concerned about “multiple documents”. All users who go on your app will be accessing the same single document.
- When the user types text in the editor, other users should, in real time, see those changes. You can test this by opening two windows and going on your web app to see if changes in one editor are reflected in the other.
- When multiple users type in the editor simultaneously, conflicts should be resolved such that both users have a “good user experience (UX)”. The details of what constitutes a good UX are up to you to define and justify. If in doubt, you may refer to Google Docs’ behavior as a reference.
- Include a brief README file so we know how to install, build and run your app.
  - (Optional) If you have extra time, please justify in the README why you chose to architect the app the way you did. Are there any tradeoffs you had to make? What would you do if you had more time and this was a real product?
