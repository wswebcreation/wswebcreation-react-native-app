Feature: Do some tests

  Background: Open the app
    Given I open the app

  Scenario: As a testautomation engineer I want to swipe
    When I swipe to left
    And I swipe to left
    And I swipe to right
    And I swipe to right

    Scenario: As a testautomation engineer I want to type
      When I swipe to left
      And I swipe to left
      And I open the chat with Dick Tracy
      Then I can type "What?"
      And I can type "No man!"