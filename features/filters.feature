@regression @filters
Feature: Filters and sorting

  Background:
    Given I am on the Amazon home page
    And I search for "laptop" using the Enter key

  @TC_FILT_002
  Scenario: Select multiple brands
    When I select the brands
      | HP   |
      | Dell |
    Then I should see search results

  @TC_FILT_009
  Scenario: Sort by price low to high
    When I sort the results by "Price: Low to High"
    Then the first prices should be mostly in ascending order