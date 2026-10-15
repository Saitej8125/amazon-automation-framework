@regression @navigation
Feature: Navigation

  Background:
    Given I am on the Amazon home page

  @TC_NAV_001
  Scenario: Hover over Account and Lists shows the menu
    When I hover over Account and Lists
    Then the Sign in link should be visible

  @TC_NAV_002
  Scenario: Hover and select Your Orders
    When I hover over Account and Lists
    And I select "Your Orders" from the account menu
    Then I should be on the sign-in page

  @TC_NAV_003
  Scenario: Open a sub-category through the nested All menu
    When I open the All menu
    And I click the "TV, Appliances, Electronics" menu item
    And I click the "Televisions" menu item
    Then the page should mention "television"