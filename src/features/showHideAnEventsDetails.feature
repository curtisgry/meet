Feature: Show/hide event details

    Scenario: When user hasn't clicked the details button no details are shown.
        Given user hasn't clicked on a details button
        When the user is viewing the list of events
        Then the details for each event should be hidden

    Scenario: When user clicks the details button on an event the details are shown
        Given the user is viewing a list of events
        When the details button is clicked
        Then the details for that event will be shown

    Scenario: When a user clicks the details button on an event that is showing details the details will then be hidden
        Given user has details open on an event
        When the details button is clicked
        Then the details for that event will be hidden
