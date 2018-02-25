@webview
Feature: Use the webview

  Background: Open the app
    Given I open the app
    Then the Home screen is visible
    When I select Webview from the tabbar
    Then the Webview screen is visible

  Scenario: As an automation engineer I want to swipe through the webview without switching context
    When I want to visit www.wswebcreation.nl
    Then the site is loaded
    Then I can scroll through the site without switching the context

  Scenario: As an automation engineer I want to scroll through the webview with a Javascript scroll
    When I want to visit www.wswebcreation.nl
    Then the site is loaded
    When I change the context to webview
    Then I can scroll through the site with Javascript

  Scenario: As an automation engineer I want to see all posts in the testautomation category
    When I want to visit www.wswebcreation.nl
    Then the site is loaded
    When I change the context to webview
    And I open the menu and select the testautomation category
    Then the category testautomation is shown

