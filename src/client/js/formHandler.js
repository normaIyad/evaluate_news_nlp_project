import { isValidUrl } from './valedurl';

// Event listener for the form submission
const form = document.getElementById('urlForm');
form.addEventListener('submit', handleSubmit);

// Define the handleSubmit function as async
async function handleSubmit(event) {
    event.preventDefault();

    // Get the URL from the input field
    const formText = document.getElementById('name').value;
    console.log(formText);
    const val = isValidUrl(formText);
    console.log(val);
    if (!isValidUrl(formText)) {
        alert("Invalid URL");
        return;
    }

    try {
        loading(true); // Show loader
        const response = await fetch('/analyze', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: formText }),
        });

        const data = await response.json();
        console.log(data);
        if (data.agreement === undefined) {
            errorHandle(true, "Invalid agreement");
        } else {
            // Display the response data in the UI
            document.getElementById('agreement').textContent = `Agreement: ${data.agreement}`;
            document.getElementById('confidence').textContent = `Confidence: ${data.confidence}`;
            document.getElementById('irony').textContent = `Irony: ${data.irony}`;
            document.getElementById('score_tag').textContent = `Score Tag: ${data.score_tag}`;
        }
    } catch (error) {
        errorHandle(true, error);
        console.error("Error fetching data:", error);
    } finally {
        loading(false); // Hide loader
    }
}

function loading(isLoading) {
    document.querySelector('.loader').style.display = isLoading ? 'block' : 'none';
}

function errorHandle(isError, message) {
    document.querySelector(".lod").classList.remove("none");
    document.querySelector('.error').style.display = isError ? 'block' : 'none';
    document.querySelector('.error').textContent = message;
}

// Export the handleSubmit function
export { handleSubmit };
