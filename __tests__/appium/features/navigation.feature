Feature: Navigate through the app

  Background: Open the app
    Given I open the app
    Then the Home screen is visible

  Scenario: As a user I want to navigate through the app with the tabbar
    When I select Webview from the tabbar
    Then the Webview screen is visible
    When I select Chats from the tabbar
    Then the Chats screen is visible
    When I select Home from the tabbar
    Then the Home screen is visible

  Scenario: As a user I want to navigate through the app by swiping
    When I swipe left
    Then the Webview screen is visible
    When I swipe left
    Then the Chats screen is visible
    When I swipe right
    Then the Webview screen is visible
    When I swipe right
    Then the Home screen is visible

  Scenario: As a user I want to use the back button in the webview header
    When I select Webview from the tabbar
    Then the Webview screen is visible
    And I want to visit www.wswebcreation.nl
    Then the site is loaded
    When I click on the go back arrow in the header
    Then the Webview screen is visible

  Scenario: As a user I want to use the back button in the chatbox header
    When I select Chats from the tabbar
    Then the Chats screen is visible
    When I select the first chat
    Then the Chatbox should be visible
    When I click on the go back arrow in the header
    Then the Chats screen is visible


