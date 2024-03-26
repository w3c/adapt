# Using well-known URLs and link types for accessible, machine-readable information architecture

## Authors

- Matthew Tylee Atkinson (@matatk), Samsung Electronics

## Introduction

Web sites can contain a huge array of varied and engaging content. This content, and the means of navigating around it, can be presented in almost any way, which makes for tailored and compelling experiences. However, whilst there are several conventions when it comes to navigation, this variability can pose challenges to certain people&mdash;and user agents acting on their behalf.

This specification aims to address the challenge of making sites more easily navigable for both people (particularly those facing accessibility barriers) and machines. It does this by standardising names for common page types. User Agents can then query as to which destinations are supported on a given site (or page of that site), and present this information in an appropriate way for the user.

This specification builds upon several existing specifications and registries, as detailed in the [foundational work](#foundational-work) section below.

## Motivating Use Cases

* Supporting people facing cognitive accessibility barriers in navigating sites.

  - This includes mechanisms that can support clear signposting within a User Agent to "standard" or "common" areas of sites that users wish to visit&mdash;e.g. "log in", "products", or the site's accessibility statement.

  - This also includes supporting users and accessibility auditors in quickly discovering the accessibility statement for a site.

* Allowing UAs, or other machines, acting on behalf of users to also find common areas of sites.

## Non-goals

* Specifying the contents of well-known pages, nor the schema of any data to be found in one of the common areas of the site, when they are accessed by machines.

  - We are developing a separate specification for a schema for the accessibility statement.

> **TODO:** Link to the other spec/explainer.

## User research

> **TODO:** Include excerpts from/pointers to Content Usable that showcase barriers that may be created by present IA/navigation designs.

Our "common destinations" come from work done by the [Cognitive and Learning Disabilities Accessibility Task Force](https://www.w3.org/WAI/GL/task-forces/coga/).

> **TODO:** Need to find a citation for them that is outside of Adapt's work.

## Well-known URLs for common pages

Sites often provide specific pages that house certain types of content, or provide certain functionality. The main aim of this specification is to make those pages easier to find, for users and machines. This is achieved by standardising some "common destinations" that sites may offer.

People visiting the site may face a range of accessibility or other barriers that make this navigation harder. Standardising some common destinations can help UAs provide a clearer interface to help people navigate.

Also, by virtue of standardising those "common destinations", we can help users avoid confusion over terms they may find unfamilar. E.g. some users may be confused by "sign in" if they were expecting "log in": with a semantic foundation, these terms can be expresssed to users in a way that makes sense to them.

This part of the specification builds on the existing standards and registries listed in the [well-known URLs](#well-known-urls) subsection below.

### Well-known URL namespace

As there are several URLs that could be provided by a site, they will be namespaced under the following parent well-known URL.

    /.well-known/ia/

Under this namespace are the following proposed URLs.

* `/.well-known/ia/accessibility`
* `/.well-known/ia/change-password` (as per [A Well-Known URL for Changing Passwords](https://www.w3.org/TR/change-password-url/), but moved under the new namespace)
* `/.well-known/ia/log-in`
* `/.well-known/ia/log-out`
* `/.well-known/ia/products`
* `/.well-known/ia/search` (intended for a dedicated search page; a [`search` landmark region](https://www.w3.org/TR/wai-aria-1.2/#search) would be used on any page that contains a search form)

> **TODO:** Add others from the Adapt spec; consult with COGA to update the list and find citations.

#### Criteria for inclusion in the namespace

> **TODO:** What qualifies a URL as being worthy of being added?
> Two potential answers:
> * We see what the community comes up with, and standardize what has consensus (a la EPUB). But...
> * We need some ground rules as to what makes a suitable well-known "ia" destination.
>   - It must refer to an important piece of content, or task, that is not specific to the subject matter of the site.

### Enumeration of common destinations

The primary goal of this specification is to support UAs in informing users which common destinations are available across the site as a whole. In order to do this efficiently, it must be possible to make this query in a single HTTP request.

When a UA requests the root URL for the information architecture namespace:

    /.well-known/ia/

A JSON string is returned that represents the list of well-known destinations this site provides. For example, if the site provided a page to allow users to sign in to their accounts, and an accessibility statement, then the returned JSON string would be:

```json
["accessibility","log-in"]
```

The UA would then be able to present this information to the user in some way. We envisage that, initially, this could be done via a browser extension that provides a pop-up (or sidebar) that would list the available destinations on the site in a localised manner for the user. In this case, that list might be:

* Accessibility statement
* Log in

> **TODO:**
> * Add other serialisation types, negotiated via HTTP headers?
> * Is JSON even a good default in this context?
> * Is there anything more common and efficient?

## Common destinations relating to in-page content

Sometimes, there may be a standard activity, e.g. "Get help information", that applies to a _particular page_ (or part of a page) on a site. In these cases, we cannot use a single well-known URL&mdash;such a URL would only point to the main "help" section's landing page.

In this case, we can instead add a `rel` attribute to the link on a page that takes the user to help information on that page. The fact that there is specific help information available could be deteced by the UA (or extension). This information could then be rendered in an appropriate way for the user, e.g:

* Being added to the extension's pop-up, in a page-specific section.
* Having a symbol or some other highlight added to the link itself in the page, to direct the user's attention to it.

This part of the specification adds values to the existing ones specifed/registered in the areas listed in the [link types/relations](#link-typesrelations) subsection below.

> **TODO:** Specify which destinations apply in this context.

## Key scenarios

### Directly visiting a common destination

* User/UA requests the well-known URL directly.
* If the well-known URL is present, a redirect is given, and the actual page loads normally (assuming the "real" URL given in the redirect is valid).
* If the well-known URL is not supported, there is an immediate 404.

### Discovering well-known destinations linked from the current page

> **TODO**

### Example: What if my site has multiple help pages

In this case, there are two things that you can do:

* Provde a well-known URI `/.well-known/ia/help` to link to the main help section's landing page.

* Provide `rel="help"` attributes on any link, on any page, that takes the user directly to a page within the help section of the site that covers a specific topic.

This will have the following effects:

* There will be notice given that the site offers help information, in the "global" UI (which we expect, in the short-term, to be a browser extension pop-up).

* Any link, on any page, that goes directly to a help topic can be signposted/emphasised by the UA.

### Enumerating common destinations

* User/UA requests `/.well-known/ia`
* Gets a JSON file listing all the available common destination keys, as described above.

### Updating a well-known URL

* When the "real" URL to which a well-known URL points is changed (because the page is moved/deleted), then the well-known URL redirect must be updated, or removed entirely.

**Note:** This is discussed in more detail in the following section.

## Detailed design discussion

### Cacheing

> **TODO:** Include discussion of cacheing from our informal review meeting at TPAC.

### Avoiding incentivising in-page links only

One of the key problems this specification aims to solve is supporting users in discovering the content, or functionality, provided by the _site as a whole_. This is key, because some people find it very hard to navigate around big sites.

By also allowing in-page links&mdash;which, it's assumed, would be closer to existing content-editing activities, and thus easier to provide/update than site-wide information in the `/.well-known/ia/` space&mdash;we risk incentivising people to only include this information.

This poses the risk that the UI presented by the UA will not give a complete picture of what is available on the site, and thus either not be of great use, or&mdash;worse&mdash;be actively confusing for people to use.

### Naming the namespace

The namespace has been specified as `/.well-known/ia/`, with "ia" standing for "information architecture". This term matches clauses 2, 4, and 8 of [the definition of "information architecture" as given by Wikipedia](https://en.wikipedia.org/wiki/Information_architecture#Definition). Clause 2 states:

> The art and science of organizing and labeling web sites, intranets, online communities, and software to support findability and usability.

Other options instead of "ia" were considered, including "information-architecture", "structure", and others. However "ia" was both felt to be accurate, and is more concise than the other alternatives.

## Considered alternatives

### Sitemaps

[Sitemaps](https://www.sitemaps.org/) are intended to solve different problems than this work.

* Sitemaps are intended to enumerate all major (and possibly minor) pages; our goal here is to highlight specific common pages that may be provided.

* Sitemaps do not give standard names to certain types of pages; our goal here is to semantically identify the purpose of specific pages, so that the UA can present this information to the user, and so that machines can reach certain pages.

It does not seem like a good fit to try to extend the format of sitemaps to accommodate these requirements.

### Parameterised well-known URLs instead of in-page link types

We first considered using well-known URLs that recieve some data, e.g. "help for [topic]" rather than adding `rel="help"` to an in-page link. This seemed to fit the well-known URL approach reasonably neatly, but it has the following drawbacks:

* A single help page is advertised, which takes a parameter. However, help may not be available for all pages.
  - Using `rel` allows _only_ the areas that _have_ help to be advertised as having help.
  - However, it does make the help less globally obvious.

## Stakeholder Feedback / Opposition

> **TODO**

## References & acknowledgements

> **TODO**

### Foundational work

> **TODO:** link to COGA/Adapt "common destinations" values (via Adapt draft)

#### Well-known URLs

* [IETF's Well-Known URIs RFC](https://www.rfc-editor.org/rfc/rfc8615)

* [IANA's well-known URI registry](https://www.iana.org/assignments/well-known-uris/well-known-uris.xhtml)

* W3C's [A Well-Known URL for Changing Passwords](https://www.w3.org/TR/change-password-url/) specification (the URL for which is lodged in IANA's registry)

#### Link types/relations

* HTML's [standard link types](https://html.spec.whatwg.org/multipage/links.html#linkTypes)

* Extended link types (also known as "link relations"):

  - [Link types managed by the Microformats project](https://html.spec.whatwg.org/multipage/links.html#other-link-types)

  - [Link types anaged by IANA](https://www.iana.org/assignments/link-relations/link-relations.xhtml)
