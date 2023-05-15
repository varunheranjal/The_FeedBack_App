# The_FeedBack_App

The provided HTML and JavaScript code represents a web page that allows users to give feedback publicly. The page consists of a form where users can enter their feedback, which is then displayed in a feedback list below the form. The feedback items in the list include the company name, a badge letter representing the company, the feedback text, the number of upvotes, and the number of days ago the feedback was submitted.

More Details provided below (It's a long read I know...):

**User Interface**: The application has a user interface built using HTML, CSS, and JavaScript. It consists of a header section with a logo and a feedback form where users can enter their feedback. The form includes a textarea for entering the feedback text, a character counter, and a submit button. The main content area displays a list of feedback items, each containing the company name, feedback text, upvote count, and a badge letter representing the company.

**Character Counter**: The character counter dynamically counts the number of characters entered in the feedback textarea and updates the counter display. It limits the maximum number of characters to 150.

**Feedback Submission**: When the user submits the feedback form, the application validates the input. The feedback text must contain a '#' symbol and be at least 5 characters long. If the input is valid, a visual indicator is shown, and the feedback item is rendered in the feedback list. The feedback item includes the company name, badge letter, feedback text, upvote count, and days ago.

**Rendering Feedback Items**: The application provides a function to render feedback items dynamically. It takes a feedback object as input and generates the corresponding HTML markup for the feedback item. The rendered item is then appended to the feedback list in the user interface.

**Upvoting Feedback**: Users can upvote feedback items by clicking the upvote button. The application handles the upvote event by incrementing the upvote count for the corresponding feedback item and disabling the upvote button to prevent multiple upvotes from the same user. (Sorry, No Downvote option here... :) )

**Fetching Feedbacks**: The application fetches existing feedback items from a specified API endpoint using the Fetch API. It retrieves the data as JSON and dynamically renders the feedback items in the feedback list. A loading spinner is displayed until the data is fetched.

**Hashtag Filtering**: The application includes a list of hashtags representing different companies. When a user clicks on a hashtag, the application filters the feedback items based on the clicked company name. It iterates over each feedback item in the list and removes items that do not match the selected company.
