// Cognito Configuration
const CognitoConfig = {
    UserPoolId: 'us-east-1_vEHyk3Hwe', // Replace with your User Pool ID
    ClientId: '1ftbsdm5hfh9edm3i2r5kqon6j', // Replace with your Client ID
    RedirectUriSignIn: 'http://d39wi8smopyxdy.cloudfront.net/', // CloudFront distribution URL
    RedirectUriSignOut: 'http://d39wi8smopyxdy.cloudfront.net/', // CloudFront distribution URL
    UserPoolDomain: 'bmitracker.auth.us-east-1.amazoncognito.com'
};

// API Gateway URL
const API_URL = 'https://v4s06pp8wg.execute-api.us-east-1.amazonaws.com/1';

$(document).ready(function() {
    // Add Item
    $('#addItemForm').submit(function(e) {
        e.preventDefault();
        let userName = $('#userName').val();
        let weight = $('#weight').val();
        let height = $('#height').val();

        $.ajax({
            url: API_URL + '/additem',
            type: 'POST',
            data: JSON.stringify({
                'userName': userName,
                'weight': weight,
                'height': height
            }),
            contentType: 'application/json',
            success: function(response) {
                alert('Item added successfully!');
            },
            error: function(error) {
                alert('Failed to add item. ' + error.responseText);
            }
        });
    });

    // Remove Item
    $('#removeItemForm').submit(function(e) {
        e.preventDefault();
        let userName = $('#userNameRemove').val();

        $.ajax({
            url: API_URL + '/removeitem',
            type: 'DELETE',
            data: JSON.stringify({
                'userName': userName
            }),
            contentType: 'application/json',
            success: function(response) {
                alert('Item removed successfully!');
            },
            error: function(error) {
                alert('Failed to remove item. ' + error.responseText);
            }
        });
    });

    // Update Item
    $('#updateItemForm').submit(function(e) {
        e.preventDefault();
        let userName = $('#userNameUpdate').val();
        let weight = $('#weightUpdate').val();
        let height = $('#heightUpdate').val();

        $.ajax({
            url: API_URL + '/updateitem',
            type: 'PUT',
            data: JSON.stringify({
                'userName': userName,
                'weight': weight,
                'height': height
            }),
            contentType: 'application/json',
            success: function(response) {
                alert('Item updated successfully!');
            },
            error: function(error) {
                alert('Failed to update item. ' + error.responseText);
            }
        });
    });
});
