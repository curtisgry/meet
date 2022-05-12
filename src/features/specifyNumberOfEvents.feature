Feature: Specify a number of events

    Scenario: By default the list of events will be limited to 32
        Given user has loaded the app
        When the user is viewing the list of events
        Then the length of the list of events should be 32

    Scenario: When the user updates the number of events input the length of the list will change
        Given the user has typed a number in the number of events input
        When the number of events is updated
        Then the length of the list of events will change to match that number

