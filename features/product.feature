@regression
Feature: Product and cart

  Background:
    Given I am on the Amazon home page
    And I search for "laptop" using the Enter key

  @smoke @TC_PROD_001
  Scenario: Open a product from the results page
    When I open the first product
    Then the product title should be visible

  @smoke @TC_PROD_002
  Scenario: Product page shows the Add to Cart button
    When I open the first product
    Then the product title should be visible
    And the Add to Cart button should be visible