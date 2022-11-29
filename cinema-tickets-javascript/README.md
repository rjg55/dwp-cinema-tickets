# Candidate Name: Rick Graham

# Assumptions

- Input for TicketService is an object with format {accountID: xxx, tickets: {INFANT: X, CHILD: Y, ADULT: Z}}

# Notes

- An issue with importing ticketpaymentservice and seatreservationservice meant I had to change their export methods but the functions remain unchanged.

- Another thing was I had trouble getting jest to detect thrown errors, to alleviate this I essentially used the InvalidPurchaseException to call a custom error and test the return value. Ideally jest would test for the thrown error. I think it was to do with the fact that jest looks for the recieved value to be a function and my recieved values were values. Putting these values in an anonymous function didn't solve this.

- The idea behind the ticketTypeCheck was to utilise it in the TicketService constructor so that any invalid noOfTickets or ticketType would be flagged up immediately. This would be an initial step to preventing malicious user input by essentially santising the input. The properties are then assigned with the knowledge that the inputs are valid/correct and can be used. I put the totalTicketAmount and totalSeat variables here so they are accessible from any method within the class.

- calculateTotalTicketAmount method - the first few lines are just to check the business rules have been met and that the ticketRequest (whilst valid) aligns with these rules.

- purchaseTickets method - this just made two 'requests' to the payment and seat services. As these methods only threw errors, if they returned undefined the request had gone through successfully.

- With more time I would have written more tests that assess when the ticketPurchaseDetails are presented in a unideal fashion (I stuck to the 'happy path' for this assignment!)

- Thanks!
