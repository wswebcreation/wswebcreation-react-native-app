Feature: Use the Chats

  Background: Open the app
    Given I open the app
    Then the Home screen is visible
    When I select Chats from the tabbar
    Then the Chats screen is visible

  Scenario: As an automation engineer I want to validate the initial chats
    When I select the first chat
    Then the following chats would be shown
      | chatMessage                                                |
      | Hey wassup?                                                |
      | So it seems like this internet thing is here to stay, huh? |


