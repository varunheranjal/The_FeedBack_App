/// -- Global Values for DOM elements and Variables/functions shown here --//

const MAX_CHARS = 150;
const textArea = document.querySelector('.form__textarea');
const counterEl = document.querySelector('.counter');
const formElement = document.querySelector('.form');
const feedbackListElement = document.querySelector('.feedbacks');
const submitBtnEl = document.querySelector('.submit-btn');
const spinnerEl = document.querySelector('.spinner');

const renderFeedbackItem = (feedbackItem) => {
        // -- Have to create a New HTML item for the Feedback Input entered. Im using a Template Literal to copy a boilerplate code so that i can edit it accordingly

        const feedbackItemHTML = `
        <li class="feedback">
        <button class="upvote">
            <i class="fa-solid fa-caret-up upvote__icon"></i>
            <span class="upvote__count">${feedbackItem.upvoteCount}</span>
        </button>
        <section class="feedback__badge">
            <p class="feedback__letter">${feedbackItem.badgeLetter}</p>
        </section>
        <div class="feedback__content">
            <p class="feedback__company">${feedbackItem.company}</p>
            <p class="feedback__text">${feedbackItem.text}</p>
        </div>
        <p class="feedback__date">${feedbackItem.daysAgo === 0 ? 'NEW' : `${feedbackItem.daysAgo}d`}</p>
        </li> `;
    
        // Now insert this new feedback item into the List (insert into the <ol> class=feedbacks </ol>). I have created a new QuerySelector element for 'Feedback list' in the Global section above
    
        feedbackListElement.insertAdjacentHTML('beforeend', feedbackItemHTML);
};

//--- COUNTER COMPONENT FOR THE TEXT FIELD --- START //

const inputHandler = () => {
    // first, specify the max number of characters allowed
    const maxNumChar = MAX_CHARS;

    // then, determine the number of characters being typed
    const numCharsTyped = textArea.value.length;

    // calculate the number of characters left (Max minus Currently being typed)
    const charsLeft = maxNumChar - numCharsTyped;
    counterEl.textContent = charsLeft;

};

textArea.addEventListener('input', inputHandler);

//--- COUNTER COMPONENT FOR THE TEXT FIELD --- FINISH //

//--- FORM COMPONENT and The SUBMIT EVENT --- START//

//validate via a Visual Indicator -- Im using a CSS class element defined in the style.css page for this
const showVisualIndicator = (textCheck) => {
    const className = textCheck === 'valid' ? 'form--valid' : 'form--invalid';

    formElement.classList.add(className);
    //remove the visual indicator below after 2 seconds
    setTimeout(() => {
        formElement.classList.remove(className);
    }, 2000);
};

const submitHandler = (event) => {
    //firstly, prevent the default browser 'action' (submitting form data to the 'action' address and refresh page)
    event.preventDefault();

    //get the Text from the 'textArea' element (the text field fyi)
    const text = textArea.value;

    //Write the Text field Validations here (eg: Check if # is present as it is mandatory or Text is long enough etc etc...)
    if (text.includes('#') && text.length >= 5) {        
        showVisualIndicator('valid');
    } else {
        showVisualIndicator('invalid');

        //focus on the Text Area again if user has entered invalid characters
        textArea.focus();
        return;
    }

    // Ok. Now we have the Text from above. We need to extract more info as shown below

    //Below line extracts the Company Name from the text inputs. I have used the Array methods (Split and Find) to do this.
    const hashTag = text.split(' ').find(word => word.includes('#'));

    const company = hashTag.substring(1);   // extract the Company 'Name' only i.e. remove the # from the above value
    const badgeLetter = company.substring(0, 1).toUpperCase();   // extract the "First Letter" from the Company name. eg: If the name is Nero, then remove 'N'

    const upvoteCount = 0;
    const daysAgo = 0;

    //Create the Feedback Item Object which is used in the renderFeedbackItem function below
    const feedBackItem = {
        upvoteCount: upvoteCount,
        company: company,
        badgeLetter: badgeLetter,
        daysAgo: daysAgo,
        text: text
    }

    // Render the Feedback Item i.e. Show or Display the Item in this list
    renderFeedbackItem(feedBackItem);

    //Send this Feedback item to the Server (obviously!)
    // Same URL endpoint of course (as used in line 126 below)
    fetch('https://bytegrad.com/course-assets/js/1/api/feedbacks', {
        method: 'POST',
        body: JSON.stringify(feedBackItem),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if(!response.ok) {
            console.log('Something went wrong mate');
            return;
        }
        console.log('Successfully Submitted');
    }).catch(error => {
        console.log(error);
    });
    //clear the Text Area
    textArea.value = '';

    //Blur the Submit button
    submitBtnEl.blur();

    //Reset the Counter
    counterEl.textContent = MAX_CHARS;

};

formElement.addEventListener('submit', submitHandler);


///--- FEEDBACK LIST COMPONENT ---///

// I'm utilizing a simple 'fetch' Promise and Thenables to Get the feedbacks data from the below mentioned URL Endpoint

fetch('https://bytegrad.com/course-assets/js/1/api/feedbacks')
        .then(response => {
        return response.json()
        .then(data => {
        //First remove the Spinner once data is returned, else it will keep displaying continuously
        spinnerEl.remove();

        //Then, iterate over each element in the returned array of feedbacks so as to display them all in the Feedback List Component
        data.feedbacks.forEach(feedbackItem => {
            // Use the renderFeedbackItem function below to implement the Feedbacks List
            
            renderFeedbackItem(feedbackItem);
    }).catch(error => {
        feedbackListElement.textContent = `Failed to retrieve the Feedback Items. Error: ${error.message}`;
    })
    
        
})
});

