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

  Scenario: As an automation engineer I want to able to chat and get a random response back
    When I select the first chat
    And I chat "Hello, it's me. I was wondering if after all these years you'd like to meet"
    Then the following chats would be shown
      | chatMessage                                                                 |
      | Hey wassup?                                                                 |
      | So it seems like this internet thing is here to stay, huh?                  |
      | Hello, it's me. I was wondering if after all these years you'd like to meet |
      | random response                                                             |
