## MongoDB Data Structure for Lottery Project

This README file outlines the MongoDB schema for the data files provided in the
rifa template project.

## Collections

### 1\. `how_it_work` Collection

- **\_id**: ObjectId
- **id**: Number
- **title**: String
- **desc**: String
- **icon**: String

## Schema Details

- **\_id**: MongoDB automatically assigns a unique identifier to each document.
- **id**: Represents the identifier of each item.
- **title**: String representing the title of the item.
- **desc**: String representing the description of the item.
- **icon**: String representing the URL or path to the icon image.

### 2\. `affiliate_partner` Collection

- **\_id**: ObjectId
- **id**: Number
- **title**: String
- **desc**: String
- **icon**: String

## Schema Details

- **\_id**: MongoDB automatically assigns a unique identifier to each document.
- **id**: Represents the identifier of each item.
- **title**: String representing the title of the item.
- **desc**: String representing the description of the item.
- **icon**: String representing the URL or path to the icon image.

### 3\. `top_affiliate` Collection

- **\_id**: ObjectId
- **id**: Number
- **name**: String
- **earn**: String
- **img**: String

## Schema Details

- **\_id**: MongoDB automatically assigns a unique identifier to each document.
- **id**: Represents the identifier of each item.
- **name**: String representing the name of the affiliate.
- **earn**: String representing the earnings of the affiliate.
- **img**: String representing the URL or path to the affiliate's image.

### 4\. `clients` Collection

- **\_id**: ObjectId
- **img**: String

## Schema Details

- **\_id**: MongoDB automatically assigns a unique identifier to each document.
- **img**: String representing the URL or path to the client's image.

### 5\. `blogData` Collection

- **\_id**: ObjectId
- **id**: Number
- **img**: String
- **title**: String
- **comments**: Number
- **views**: Number
- **short_desc**: String
- **date**: String
- **author_name**: String
- **author_avt**: String

## Schema Details

- **\_id**: MongoDB automatically assigns a unique identifier to each document.
- **id**: Represents the identifier of each item.
- **img**: String representing the path or URL to the blog image.
- **title**: String representing the title of the blog post.
- **comments**: Number representing the number of comments on the blog post.
- **views**: Number representing the number of views on the blog post.
- **short_desc**: String representing a short description of the blog post.
- **date**: String representing the date of the blog post.
- **author_name**: String representing the name of the author of the blog post.
- **author_avt**: String representing the path or URL to the author's avatar
  image.

### 6\. `cartData` Collection

- **\_id**: ObjectId
- **id**: Number
- **ticket**: Array of Numbers

## Schema Details

- **\_id**: MongoDB automatically assigns a unique identifier to each document.
- **id**: Represents the identifier of each item.
- **ticket**: Array of Numbers representing the lottery ticket numbers in the
  cart.

### 7\. `contestData` Collection

- **\_id**: ObjectId
- **id**: String
- **title**: String
- **ticket_price**: String
- **img**: String
- **contest_no**: String
- **day_remain**: Number
- **ticket_remain**: Number
- **tags**: Array of Strings

## Schema Details

- **\_id**: MongoDB automatically assigns a unique identifier to each document.
- **id**: Unique identifier for the contest.
- **title**: String representing the title of the contest.
- **ticket_price**: String representing the price of a contest ticket.
- **img**: String representing the path or URL to the contest image.
- **contest_no**: String representing the contest number.
- **day_remain**: Number representing the number of days remaining for the
  contest.
- **ticket_remain**: Number representing the number of tickets remaining for the
  contest.
- **tags**: Array of Strings representing tags associated with the contest.

### 8\. `faqData` Collection

- **\_id**: ObjectId
- **id**: Number
- **question**: String
- **answer**: String

## Schema Details

- **\_id**: MongoDB automatically assigns a unique identifier to each document.
- **id**: Represents the identifier of each FAQ item.
- **question**: String representing the question.
- **answer**: String representing the answer to the question.

### 9\. `teamData` Collection

- **\_id**: ObjectId
- **id**: Number
- **name**: String
- **title**: String
- **img**: String

## Schema Details

- **\_id**: MongoDB automatically assigns a unique identifier to each document.
- **id**: Represents the identifier of each team member.
- **name**: String representing the name of the team member.
- **title**: String representing the title or role of the team member.
- **img**: String representing the path or URL to the team member's image.

### 10\. `testimonialData` Collection

- **\_id**: ObjectId
- **id**: Number
- **img**: String
- **name**: String
- **comment**: String

## Schema Details

- **\_id**: MongoDB automatically assigns a unique identifier to each document.
- **id**: Represents the identifier of each testimonial.
- **img**: String representing the path or URL to the testimonial's image.
- **name**: String representing the name of the person giving the testimonial.
- **comment**: String representing the testimonial comment.

### 11\. `postDrawData` Collection

- **\_id**: ObjectId
- **id**: String
- **draw**: String
- **contest_no**: String
- **result**: String
- **status**: Boolean

## Schema Details

- **\_id**: MongoDB automatically assigns a unique identifier to each document.
- **id**: Represents the identifier of each post-draw data item.
- **draw**: String representing the date of the draw.
- **contest_no**: String representing the contest number.
- **result**: String representing the draw result.
- **status**: Boolean representing the status of the post-draw data.

### 12\. `allTransactions` Collection

- **\_id**: ObjectId
- **id**: Number
- **date**: String
- **month**: String
- **description**: String
- **referral**: String
- **pay_method**: String
- **amount**: String
- **transaction**: String
- **status**: Number

## Schema Details

- **\_id**: MongoDB automatically assigns a unique identifier to each document.
- **id**: Represents the identifier of each transaction.
- **date**: String representing the date of the transaction.
- **month**: String representing the month of the transaction.
- **description**: String representing the description of the transaction.
- **referral**: String representing the referral of the transaction.
- **pay_method**: String representing the payment method used in the
  transaction.
- **amount**: String representing the amount of the transaction.
- **transaction**: String representing the type of transaction (e.g., deposit,
  withdrawal).
- **status**: Number representing the status of the transaction.

### 13\. `winnerData` Collection

- **\_id**: ObjectId
- **id**: String
- **title**: String
- **draw_at**: String
- **winning_number**: Array of Numbers
- **contest_no**: String
- **winer_img**: String
- **winning_price_img**: String

## Schema Details

- **\_id**: MongoDB automatically assigns a unique identifier to each document.
- **id**: Unique identifier for the winner.
- **title**: String representing the title of the contest.
- **draw_at**: String representing the date and time of the draw.
- **winning_number**: Array of Numbers representing the winning numbers.
- **contest_no**: String representing the contest number.
- **winer_img**: String representing the path or URL to the image of the winner.
- **winning_price_img**: String representing the path or URL to the image of the
  winning prize.
