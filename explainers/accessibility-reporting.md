# Accessibility reporting: use cases, endpoints, and schema

## Authors

- Matthew Tylee Atkinson (@matatk), Samsung Electronics

## Introduction

> **TODO**

This work builds on the [Reporting API](https://www.w3.org/TR/reporting-1/).

## Motivating Use Cases

* Providing the means for accessibility test results to be automatically, semi-automatically, or manually reported.
* Providing the means for people to report difficulties they are having on a given page.

> **Note:** It is anticipated that using infrastructure such as the Reporting API will be particularly helpful in situations where pages are comprised of content obtained from multiple sources, because the reporting can be done "at the edge" where this content is combined.
>
> To be useful, though, this will require organisations to be able to reproduce (or at least approximate) the assembled content, based on the information provided by the report.

## Non-goals

* Specifying the location (URI) of the accessibility statement. This is the subject of a separate specification.
* Specifying the schema of the machine-readable accessibility statement. This is the subject of a separate specification.

> **TODO:** Link to the other specs/explainers.

## User research

> **TODO**

## Accessibility reporting mechanisms

### Reporting endpoint for accessibility results

> **TODO**

We will standardise an endpiont to be used for accessibility reporting&mdash;or possibly two endpoints:

* A reporting endpoint for (automatic, semi-automatic) inspection tooling.
* A reporting endpoint for issues that a user reports (manually, or with assistance from a tool that may include attachments, like screengrabs) when they encounter an error.

### Schema for automated accessibility reports

> **TODO**

We will standardise a schema to be used by automated accessibilty tooling.

Challenges include:

* Scoping (Just WCAG, or also best practices&mdash;in which case, how should they be flagged?)
* Identifying the part of the page that is affected.
* Attachments.
* Units.

We will probably find help with this via the [Accessibility Conformance Testing (ACT)](https://www.w3.org/WAI/standards-guidelines/act/).

### Schema for accessibility barriers affecting users

> **TODO**

We will standardise a schema for providing reports from users.

## Key scenarios

### An automated accessibility scanner

> **TODO**

### Manual in-browser accessibility inspection tools

> **TODO**

### A site visitor experiencing barriers

> **TODO**

## Detailed design discussion

> **TODO**

## Considered alternatives

> **TODO**

## Stakeholder Feedback / Opposition

> **TODO**

## References & acknowledgements

> **TODO**

* [Research Questions TF: Use cases for the Reporting API](https://www.w3.org/WAI/APA/task-forces/research-questions/wiki/Reporting_API_Use_Cases)
* [Accessibility Conformance Testing (ACT)](https://www.w3.org/WAI/standards-guidelines/act/)
* [Reporting API](https://www.w3.org/TR/reporting-1/)