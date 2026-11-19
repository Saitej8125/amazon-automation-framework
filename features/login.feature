@regression @login
Feature: Sign-in page (no real credentials are used)

  Background:
    Given I am on the Amazon home page

  @smoke @TC_LOGIN_001 @severity:critical
  Scenario: Sign-in page opens from the header
    When I open the sign-in page from the header
    Then the sign-in email field should be visible

  @negative @TC_LOGIN_002 @severity:normal
  Scenario: Continue with an empty field
    When I open the sign-in page from the header
    And I continue with an empty sign-in field
    Then the sign-in message should say "Enter your mobile number or email"

  @negative @TC_LOGIN_003 @severity:normal
  Scenario: Continue with an invalid email format
    When I open the sign-in page from the header
    And I continue with the "invalidEmail" value from test data
    Then the sign-in message should say "Invalid email address"

  @negative @TC_LOGIN_004 @severity:normal
  Scenario: Continue with an email that has no account
    When I open the sign-in page from the header
    And I continue with the "unregisteredEmail" value from test data
    Then Amazon should say no account was found or offer to create one

  @TC_LOGIN_005 @severity:minor
  Scenario: Sign-in page offers sign in and account creation in one form
    When I open the sign-in page from the header
    Then the sign-in page heading should say "Sign in or create account"