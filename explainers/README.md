# WAI-Adapt Explainer

## Authors

* W3C WAI-Adapt TF participants

## Participate

* Issues: https://github.com/w3c/adapt/issues
* Discussions: https://github.com/w3c/adapt/discussions

## Overview

**Note:** This is the Explainer for the Adapt TF's work as a whole&mdash;you can find more details on specific projects in the other files in this directory.

**FIXME:** The "explainer" below contains useful info, but is not in the correct format (concentrating on end-user use cases first; using standard headings); it needs to be re-written to fit that format&mdash;and perhaps have the content-module-specific parts factored out into a content module explainer? Also, the list of modules below should refer to the other explainers that exist in this directory.

**FIXME:** The Explainer template doesn't have an "Overview" section (though maybe that's OK in this case).

## Introduction

People have very different needs. There are many people with cognitive
and learning disabilities that affect their ability to interact with the
web. Some people cannot process numeric information (dyscalculia), but
others understand numbers better than words. Some people with severe
language disabilities use symbols to represent words; some people need
(or want) simplified user-interfaces. Different people find different
layouts and types of content easier to understand, and what is useable
and understandable by one person can be be too complex for another. The
WAI-Adapt Task Force seeks to address these varied and conflicting user
needs, so that content can be made more understandable to individual
users based on their unique requirements. The various WAI-Adapt
specification modules described in this Explainer provide various means
for web technologies to address these requirements.

The various WAI-Adapt module specifications enable authors to
selectively add semantic information about content to enable content and
interface personalization for individual users. In turn this facilitates
user-agents for people with learning and cognitive disabilities.

WAI-Adapt technologies allow authors to add additional semantic
information using a collection of new attributes and values, with (in
most cases) a fixed token list (taxonomies). This document provides an
explanation for understanding how the WAI-Adapt attributes can be used
to personalize a more accessible web site.

### Further details

> **FIXME:** This was the "Introduction" section, with the above being the "Abstract"&mdash;but Explainers are intended to start with a brief overview. This Explainer is an umbrella one, so maybe a bit different, but this still need some work to bring it in line with reader expectations.

> **FIXME:** Perhaps this material could be put in an appendix?

The WAI-Adapt specification modules:

- Expands upon the types of accessibility information that the author
  can provide;
- Facilitate preference-driven individual personalization;
- Enable the author to specify key semantics to support users with
  cognitive impairments;
- Define a syntax for adaptable content such as: links, buttons,
  symbols, help, and keyboard shortcuts.

Personalization involves tailoring aspects of the user experience to
meet the preferences or needs of individual users. For example, having
familiar terms and symbols is critical for effective use of web content
for many as described in the user scenarios and use cases published in
the [Making Content Usable (for COGA
people)](https://www.w3.org/TR/coga-usable/). However what is familiar
to one user will inevitably be new and foreign to another.
Personalization based on WAI-Adapt AAC symbol support technologies
supports loading a set of symbols that is appropriate for the specific
user, ensuring that each user is presented with familiar symbols.

Technology holds the promise of being extremely flexible and the design
of many systems includes the expectation that users can optimize their
interaction experience according to their personal preferences or
accessibility needs.

### Why We Need WAI-Adapt

> **FIXME:** Perhaps this material could be put in an appendix?

WAI-Adapt will allow assitive technology to:

1.  adapt to and meet the user's needs. Users who have difficulty with
    established, mainstream patterns can interact with interfaces
    modified to their preferences and abilities.
2.  modify levels of complexity as people's skills improve or decline
    over time. For example, extra support may be critical for some
    people but distracting for others.
3.  provide better support to users who require:
    - familiar and consistent symbols, iconography, and graphics
    - tooltips or similar on-demand help or clues
    - language they understand
    - fewer or more constrained features
    - clearer distinction between native and third-party content
    - custom keyboard shortcuts

To achieve this, we need standardized terms and supportive syntax. These
can be linked to associated symbols, terms, translations and
explanations. This allows modifications based on an individual's
personal preferences.

<div class="example">

Example of sending an email:

An author programmatically identifies that a button sends an email.
Based on user preference settings the interface can be modified to:

- render the button with an alternative term, and/or furnish an
  additional tooltip that is understandable by the individual user;
- include F1 help that explains the send function in simple terms;
- associate the button with a keyboard shortcut that is always used for
  send (Submit);
- identify the button as important and always rendered in an emphasized
  form.

</div>

### Use Case Examples

> **FIXME:**
> 
> * Perhaps this material could be put in the "User research" section?
>
> * The linked "Requirements" doc is out-of-date.
>
> * These examples are _way_ too detailed, and refer to attributes that don't exist yet&mdash;need to re-phrase to talk _briefly_ about the _problems_ being solved, but not the specific mechanism. It is OK to say (in a later section) that the general solution is to provide attributes to provide additional element-level semantics, but most of these are not fleshed out and ready for implementation yet, so they shouldn't be mentioned in specific detail (and when they are, they should be in separate explainers).

[Requirements for WAI-Adapt](requirements/) elaborates many use cases
that further contextualize the above summary of user needs. These
example use cases form the basis of requirements for this technology.
WAI-Adapt enables developers to create targeted extensions as additional
use cases are encountered.

Examples

- [Easily Distracted / Overwhelmed](#distracted)
- [Difficulty Understanding Numbers](#difficulty_numbers)
- [Mild-Moderate Language Impairment / Learning
  Disability](#learning_disability)
- [Severe Language Impairment](#language_impairment)
- [Working Memory and Short-term Memory Impairment](#memory_impairment)

#### Easily Distracted / Overwhelmed

Someone who is either easily distracted or can be easily overwhelmed
with too much information on a web page needs the ability to simplify
the page. They want just the critical information, and need anything
that is not integral to the understanding and use of the page
suppressed.

<div class="example">

Example: The user wants to get the latest weather report for their city
and goes to a weather website.

Finding the actual weather forecast is actually a little challenging
even if you have no disabilities due to all the additional content on
the screen; along with advertisements, there is also the day's top
stories, trending news, and social media to cognitively filter. If you
are easily overwhelmed or distracted getting the key information about
today's weather is a challenge. Having the ability to personalize and
prioritize all but the key information (i.e. just the weather forecast
for my city) is critical for this user.

</div>

In this example, the author can mark the `<section>`, `<p>`, or `<div>`
that contains the actual weather report and any associated tools to
manipulate the weather report (i.e. city search, hourly vs. 5 day
forecast, etc.) with the `adapt-simplification` attribute (with a value
of "critical"), and mark the other on-screen content as "medium"
(default) or "low". (e.g.
`<p adapt-simplification="critical">`*Today&rsquo;s forecast is a high
of 95&deg; and a low of 40&deg;*`</p>`)

For websites which rely on advertising revenue, it may be undesirable to
completely suppress advertisements. We envision that this attribute
could also facilitate relocating the most critical sections of a website
above anything that is a lower priority. (i.e. Content re-ordering)

WAI-Adapt recognizes that appropriate simplification will often be task
determined. A complex page will often support multiple tasks each of
which could be critical to the user requiring simplification at
different times. We propose to investigate how we might facilitate users
defining what task is critical to them in the moment rather than
pre-determining what is primary or secondary in advance.

#### Difficulty Understanding Numbers

Someone who has dyscalculia will have difficulty understanding numbers
and will have a hard time interacting with websites that use numbers to
convey information. Therefore, critical numeric information must be
provided in an alternative format that the user can understand.

<div class="example">

Example: The user wants to get the latest weather report for their city
and goes to a weather website.

For today&rsquo;s forecast, it shows a high of 95&deg; and a low of
40&deg;. This representation is not understandable for particular user.
Presenting this numeric information as a symbol or text would benefit
the user. For example, next to the number 95, there could be:

- a picture of someone wearing shorts and a tee-shirt with the sun above
  or
- simply a text alternative of &ldquo;Very warm&rdquo;.

Next to the number 40, there can be:

- a picture of someone wearing a jacket with pants, or
- a text alternative of &ldquo;Very cold&rdquo;.

Next to the humidity index of 90%, there could be a text alternative of
&ldquo;muggy&rdquo;.

</div>

In this example, the author would mark up the numbers using the
`adapt-numberfree` attribute. The default would show the numeric value.
Those needing an alternative representation for numbers, would get an
associated image or description/values as simplified text instead.

It is important to note that people with dyscalculia are often very good
with words, so long text can be better than short numbers.

#### Mild-Moderate Language Impairment / Learning Disability

Those who have a moderate Language Impairment / Learning Disability may
have a limited vocabulary. They will only know terms that are in the
core vocabulary they have learned. They may also use symbols to
represent words and concepts.

<div class="example">

Example: The user may know the word "name" or "last name" but not
recognize the term "family name" or "surname" as cognates.

For some users, learning new terms is a very slow process, requiring
hours of work. For these users, reading web content may also be a very
slow process, so that finding the information desired on some particular
web page can present a laborious barrier. The ability to personalize a
web page and present symbols instead, or alongside content can help some
users better and more promptly understand the content being provided

</div>

Note that some people with language disabilities are good at numbers.
They will want a long string of text replaced with a short number:
`<span `**`adapt-easylang="90% of the time this happens"`**`> normally this is the expected outcome</span>`.
This is the opposite of the numberfree example.

Additionally, because reading content for some users is extremely
time-consuming, they may also want less content and fewer features on a
given web page.

#### Severe Language Impairment

Some users with a severe speech and/or physical impairment may
communicate using symbols, rather than written text, as part of an
Augmentative and Alternative Communication (AAC) system. The use of
symbols to represent words is their primary means of communication when
both consuming and producing information. Symbol users face a wide
variety of barriers to accessing web content, but one of the main
challenges is a lack of standard inter-operability between different
proprietary symbol sets, or a mechanism for translating the same concept
from one symbol set to another.

User Stories include:

- An assisted living home authors adult education courses and
  life-skills content, for example, how to make dinner using a
  microwave. Within their core user-base, users are accustomed to
  different symbol sets. The authors want to create content for all
  users across various symbol sets.
- A large banking site wants people to be as autonomous as possible
  while using their services. They provide augmented symbol references
  onto their core services. They need a mechanism to programmatically
  support multiple symbol sets within the code.
- People who know different symbol sets wish to talk to each other.
- A government agency creating information sheets about human rights and
  patient rights are seeking feedback from impacted users. They add
  symbols from a common symbol set to support a majority of different
  users. The agency would prefer to use a common symbol reference to
  support people who use or require different symbols. This allows all
  symbol set users to both read and edit the content.

<div class="example">

Example: Using the `adapt-symbol` attribute, an author programmatically
tags the label for a form input with the appropriate symbol value. Based
on user preference settings, a browser helper application or stand-alone
tool could then render that label using an appropriate symbol,
alternative term, and/or furnishes an additional tool-tip that is
understandable by the individual user. Using the [Bliss
Symbolics](https://www.blissymbolics.org/) set's unique reference
numbers as our 'taxonomy', other symbol sets can map their equivalent
symbols against the Bliss set.

` <label for="address" `**`adapt-symbol="14885"`**`>Your Principal Residence</label>`  
`<input type="textarea" id="address" adapt-purpose="street-address"> `

Where the symbol value 14855 maps back to "Home".

</div>

##### Proof of Concept: Symbol Example

In the screen shots below, a browser extension uses the `adapt-symbol`
attribute to load symbols that are familiar to the user.

Note that users learn a specific symbol vocabulary. However, the various
symbol vocabularies are mutually unintelligible: users familiar with one
set of symbols may not be familiar with or understand an alternative
set. WAI-Adapt's `adapt-symbol` attribute offers a mechanism to
translate between symbol sets, to allow people to communicate with one
another where it was previously not possible.

<figure>
<img
src="https://user-images.githubusercontent.com/8376341/79741687-5b20a880-830a-11ea-814d-97ed7132d7d1.png"
style="height:95%; width:95%" alt="screen shot, no symbols" />
<figcaption>The original page</figcaption>
</figure>

<figure>
<img
src="https://user-images.githubusercontent.com/8376341/79741694-5cea6c00-830a-11ea-80f6-6c7b632a451d.png"
style="height:95%; width:95%"
alt="screen shot with less content and symbols" />
<figcaption>The same page loaded, but the user-agent has removed content
and added symbols</figcaption>
</figure>

<figure>
<img
src="https://user-images.githubusercontent.com/8376341/79741698-5d830280-830a-11ea-9976-f7816c4748be.png"
style="height:95%; width:95%"
alt="screen shot with different symbols (bliss)" />
<figcaption>The same page loaded, but the user-agent has removed content
and added different symbols that this user is more familiar
with</figcaption>
</figure>

#### Working Memory and Short-term Memory Impairment

Users may have differences in both working and short-term memory. For
some users the number of items that can be held in working memory is a
fraction of the amount most users can hold in memory. Whereas most
adults can repeat about seven digits in correct order, some users may
only manage two or three digits. When these users become distracted,
they are also likely to forget any information in their working memory.

<div class="example">

Example: Many processes consist of a sequence of separate steps or
actions which must be performed by a user to complete a process or
workflow.

Users need to remember completed tasks in order to identify their
location in a process. In addition, a user must be able to navigate to
completed tasks to make modifications or corrections.

</div>

A step indicator allows an author to define steps within a process or
represent an entire user path outside of the context of a defined
process. This includes turning steps between defined processes into
breadcrumbs or linked steps that identify completed tasks. This allows
the user to navigate back to completed steps and identify a user's
current location in a path.

More information on personas and user needs can be found in
<a href="https://www.w3.org/TR/coga-usable/" rel="nofollow">Making
Content Usable for People with Cognitive and Learning Disabilities</a>.

### Out of Scope

While the intention of this work is to introduce a new set of attributes
to support WAI-Adapt, the following work items are out of scope:

- Develop an API for browsers or other user-agents
- Develop or produce supporting technology (browser extension,
  stand-alone software, etc.)
- Develop or produce an authoring tool to support the new attributes
- Produce a symbol set for `adapt-symbol`

We encourage a the development of these items and a list of
implementations can be found on [our
wiki](https://github.com/w3c/adapt/wiki).

### Modules

WAI-Adapt specifications will be published as individual modules. How
many modules will eventually be created is unclear at the time of this
writing. However, each module specification will include use cases and
vocabularies. At this time only one specification module is advancing
toward Candidate Recommendation status at W3C:

- [WAI-Adapt: Symbols Module:](symbols/index.html)

  This module provides vocabularies that enable user-agents to augment
  or adapt content to allow authors to support AAC symbols.

Additional modules, some available in early drafts, may include:

- Use-cases and vocabularies for identifying the purpose of controls,
  symbols and user interface elements, and supports simplification and
  avoiding distractions.

- [WAI-Adapt: Help and Support Module:](help/index.html)

  The first working draft of this module is now available.

  This module addresses adding information about the content to enable
  help scaffolding and additional support for different user scenarios.

- [WAI-Adapt: Tools Module:](tools/index.html)

  The first working draft of this module is now available.

  This module addresses adding information about the content to enable
  user-agents and extensions to provide additional support to the user.
  One example is adaptable breadcrumbs.

## Vocabulary Structure

WAI-Adapt is made of a vocabulary of properties and their values. This
generic structure makes it possible to apply WAI-Adapt in a variety of
contexts by adapting how the vocabulary is instantiated. The [Vocabulary
Implementations](#vocabulary-implementations) section below describes
current ways to use the vocabulary.

### Properties

Properties are the main units of WAI-Adapt types supported by the
vocabulary. A given property supports a specific type of WAI-Adapt. That
property would only be used once on a given piece of content, but
multiple different properties could be used on the same piece of content
to address different needs.

### Values

Values provide the specific WAI-Adapt information for the property. The
possible values for each property are elaborated in the definition of
the property in the modules. Some properties require the value to come
from a predefined list of possible values, others can accept arbitrary
strings, and some may accept multiple values. The attribute value may be
one of the following types:

ID reference  
Reference to the ID of another element in the same document

ID reference list  
A list of one or more ID references.

integer  
A numerical value without a fractional component.

number  
Any real numerical value.

string  
Unconstrained value type.

token  
One of a limited set of allowed values.

token list  
A list of one or more tokens.

URI  
A Uniform Resource Identifier as defined by [RFC
3986](http://www.ietf.org/rfc/rfc3986.txt) \[\[RFC3986\]\]. It may
reference a separate document, or a content fragment identifier in a
separate document, or a content fragment identifier within the same
document.

<div class="note">

The attributes and values in this specification are not intended to
overide the semantics exposed in the Accessibility Tree, but rather
augment them. In the case of conflict between an element's semantics and
the attribute values, validation algorithms should issue a warning but
not an error.

</div>

## Vocabulary Implementations

### Current Usage

This publication of the WAI-Adapt provides several *key-value pairs*
(attribute = value). These attributes include but are not limited to:

- [adapt-action](symbols/#action-explanation)
- [adapt-destination](symbols/#destination-explanation)
- [adapt-purpose](symbols/#purpose-explanation)
- [adapt-symbol](symbols/#symbol-explanation)

Other properties exist or will be developed as the modules mature.

### Technology Comparison Summary

The task force reviewed various vocabulary options before deciding upon
the use of the HTML attribute syntax. The list of technologies included:

- [RDFa Lite](https://www.w3.org/TR/rdfa-lite/)
- [HTML Microdata](https://www.w3.org/TR/microdata/)
- Additional ARIA attributes (e.g. `aria-action`)
- AUI-prefixed attributes: a new, WAI-Adapt specific set of attributes
  (e.g. `aui-action`)
- A new single attribute, purpose, to encode both properties and values
- A new single attribute with properties and values encoded using inline
  css syntax of key/value pairs
- An extension of the above single attribute using CSS key/value pairs
  and simple text content
- Three new attributes for token, value, and URI, respectively
- Value pairs - a WAI-Adapt type attribute and an associated value
  attribute.
- Negotiate new WAI-Adapt attributes into native host languages
- Embed WAI-Adapt data via JavaScript Object Notation (JSON)
- Use of the existing data- attribute mechanism of HTML

#### Considerations in the decision process:

Authoring  
ease of authoring and potential ambiguity between WAI-Adapt and existing
features;

User-Agents  
ease of determining and parsing the properties & values and the ability
to implement as an extension;

Host Languages  
requirement for special host language support, works in multiple
languages, integrates with ARIA and HTML, easy extension of the
vocabulary, and needed number of new features;

Functionality  
necessity of multiple properties and interaction between properties,
integration with other vocabularies, likely search engine support for
content alternatives, and typed value support;

Strategy  
avoid segregation of accessibility from other features, provide a clear
path to join with other W3C WAI-Adapt efforts, and stable enough to
avoid modification of authored content over time;

The details of our research and discussion are documented on the
[Comparison of ways to use vocabulary in
content](https://github.com/w3c/adapt/wiki/Comparison-of-ways-to-use-vocabulary-in-content)
and [Prototypes with data
dash](https://github.com/w3c/adapt/wiki/Prototypes-with-data-dash-*-(Take-2))
pages in our Wiki.

### Stakeholders

This document is useful for:

- Content creators who want to accommodate as many users as possible,
  including AAC users, and people with learning & cognitive
  disabilities.
- Content creators who want to create adaptable content that meets the
  users' preferred experience
- Technology developers and providers who want to build technologies
  that enable more people to use the web effectively
- Developers of symbol languages and related technologies
- Students who wish to develop a new software project that meets a real
  need
- Policy makers who want to understand what is possible for inclusion

For early implementations of content we suggest including a link to an
[extension
implementation](https://github.com/w3c/adapt/wiki/Implementations-of-Semantics)
that can maximize the benefit for users.

### Acknowledgements

> **FIXME:** placeholder

### Appendix: All proposed attributes and modules

> **FIXME:** This is just here to keep a more visible record of what _was_ proposed&mdash;need to find a more useful place, e.g. the wiki.

#### Attributes

* `adapt-action`
* `adapt-destination`
* `adapt-purpose` (autocomplete reasons++)
* `adapt-symbol`
* `adapt-simplification` (critical, ...)
* `adapt-numberfree`
* `adapt-easylang`

#### Modules

* Content (still wanting to propose the attributes from there, but concentrating on symbols only for now)
* Symbols
* Help and support
* Tools
