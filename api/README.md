# Task 3 - API Testing
> Given you have been asked to set up tests for the API Catfact Ninja,  
https://documenter.getpostman.com/view/1946054/S11HvKSz  
Brief:  
What would you test about this API?  
Why would you test this?  
How would you test this?  
Write three example tests for this API using Postman.  
Describe the process you went through setting up these three tests.  

Example tests in Postman collection with Collection variables.  
One test implemented for each of the API endpoints  
1. Breeds /breeds
   * Input: limit - **breeds_limit** variable
   * Checks
      1. Status code is 200
      2. Number of breeds equal to limit
      3. From and to values
      4. Per page value
2. Fact /fact
   * Input: max length - **max_length** variable
   * Checks
      1. Status code
      2. Fact length < max length
      3. Length field = Fact length
3. Facts /facts
   * Inputs:
      1. Limit - **facts_limit** variable
      2. Max length - **max_length** variable
   * Checks
      1. Status code
      2. Length of data
      3. From and to
      4. Per page
      5. Fact length

These are just example tests. Other possible cases to check in the API:  
1. /breeds limit:
   * 0
   * Negative
   * greater than total number of breeds 
2. /facts limit:
   * 0
   * Negative
   * greater than total number of facts
3. /fact and /facts max_length:
   * 0
   * Negative
   * smaller than shortest cat fact
4. Pagination (pass page parameter in requests)
   * Current page
   * Next and previous page URLs
   * Total number of pages
