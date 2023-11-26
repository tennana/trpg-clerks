chrome.runtime.onInstalled.addListener(() => {
  chrome.action.disable();

  // Clear all rules to ensure only our expected rules are set
  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    // Declare a rule to enable
    const rule = {
      conditions: [
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: { hostEquals: 'ccfolia.com', pathPrefix: '/rooms/' },
        }),
      ],
      actions: [new chrome.declarativeContent.ShowAction()],
    };
    const rules = [rule];
    chrome.declarativeContent.onPageChanged.addRules(rules);
  });
});
