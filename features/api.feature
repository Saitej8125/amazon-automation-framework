@api @regression
Feature: Posts API (JSONPlaceholder)

  @TC_API_001 @severity:critical
  Scenario: Get a single post
    When I send a GET request to "/posts/1"
    Then the response status should be 200
    And the response should have the fields "userId, id, title, body"

  @TC_API_002 @severity:normal
  Scenario: Get all posts
    When I send a GET request to "/posts"
    Then the response status should be 200
    And the response should contain 100 items

  @TC_API_003 @severity:normal
  Scenario: Create a post
    When I send a POST request to "/posts" with the body
      | title  | foo |
      | body   | bar |
      | userId | 1   |
    Then the response status should be 201
    And the response field "title" should be "foo"

  @TC_API_004 @negative @severity:minor
  Scenario: Get a post that does not exist
    When I send a GET request to "/posts/9999"
    Then the response status should be 404