/* main.js */

document.addEventListener('DOMContentLoaded', function () {
    // Image Preview Functionality
    const imageInput = document.getElementById('id_image'); // Update with the actual input ID
    const imagePreview = document.getElementById('image-preview'); // Update with the actual preview element ID

    if (imageInput && imagePreview) {
        imageInput.addEventListener('change', function () {
            displayImagePreview(this, imagePreview);
        });
    }

    // Asynchronous Form Submission
    const photoForm = document.getElementById('photo-form'); // Update with the actual form ID

    if (photoForm) {
        photoForm.addEventListener('submit', function (e) {
            e.preventDefault();
            submitFormAsync(this);
        });
    }
});

function displayImagePreview(input, previewElement) {
    const file = input.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            previewElement.src = e.target.result;
        };

        reader.readAsDataURL(file);
    }
}

function submitFormAsync(form) {
    const formData = new FormData(form);
    const xhr = new XMLHttpRequest();

    xhr.open('POST', form.action);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

    xhr.onload = function () {
        if (xhr.status === 200) {
            // Handle success, e.g., show a success message
            console.log('Form submitted successfully!');
        } else {
            // Handle errors, e.g., display an error message
            console.error('Error submitting form.');
        }
    };

    xhr.onerror = function () {
        // Handle network errors
        console.error('Network error occurred.');
    };

    xhr.send(formData);
}
