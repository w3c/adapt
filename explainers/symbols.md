# WAI-Adapt: Symbols Explainer

## Authors

- Matthew Tylee Atkinson (@matatk), Samsung Electronics

## Participate

* Issues: https://github.com/w3c/adapt/issues
* Discussions: https://github.com/w3c/adapt/discussions

## Contents

<!-- toc -->

- [Introduction](#introduction)
  * [Demo](#demo)
- [Goals](#goals)
- [Out of scope](#out-of-scope)
- [Important notes on symbols and rendering](#important-notes-on-symbols-and-rendering)
- [User research](#user-research)
- [Use of Bliss Unicode code points](#use-of-bliss-unicode-code-points)
  * [Content author's perspective](#content-authors-perspective)
  * [Symbol providers' perspective](#symbol-providers-perspective)
  * [Browser implementers' perspective](#browser-implementers-perspective)
  * [Unicode perspective](#unicode-perspective)
  * [Managing changes](#managing-changes)
- [The W3C AAC Symbol Registry](#the-w3c-aac-symbol-registry)
- [Extending `<ruby>` to support "symbol" content](#extending-ruby-to-support-symbol-content)
- [Privacy considerations](#privacy-considerations)
- [Considered alternatives](#considered-alternatives)
  * [The `adapt-symbol` attribute](#the-adapt-symbol-attribute)
    + [Mapping concepts to symbols (in general)](#mapping-concepts-to-symbols-in-general)
    + [Concept IDs: keying schemes](#concept-ids-keying-schemes)
      - [BCI concept IDs as attribute values](#bci-concept-ids-as-attribute-values)
        * [Advantages](#advantages)
        * [Disadvantages](#disadvantages)
      - [Bliss characters' Unicode representations as attribute values](#bliss-characters-unicode-representations-as-attribute-values)
        * [Advantages](#advantages-1)
        * [Disadvantages](#disadvantages-1)
        * [Unknown factors](#unknown-factors)
    + [Multiple concepts per attribute value](#multiple-concepts-per-attribute-value)
    + [Looking up concepts](#looking-up-concepts)
- [Stakeholder feedback/opposition](#stakeholder-feedbackopposition)
- [References](#references)
- [Acknowledgments](#acknowledgments)

<!-- tocstop -->

## Introduction

<!-- _[Overall WAI-Adapt Explainer](README.md)_ -->

Some people find graphical symbols easier to interpret than written text.
They may find that when symbols are presented alongside text content, that content is easier to understand.
But there are many different symbol sets in use, and people don't tend to learn more than one.

We propose an approach that allows content authors to mark up the _concepts_ relevant to their content,
so that the appropriate symbol(s) for that concept can be rendered for the user,
using _their chosen symbol set_.

We use the set of concepts maintained by [Blissymbolics Communication International](https://www.blissymbolics.org/) (BCI).
These concepts underpin the Blissymbolics (or "Bliss") language&mdash;though our use of the concepts is strictly for mapping from a concept to the appropriate symbol(s) for the user, and is not grammatical in nature.

We're working closely with BCI on this approach, which is comprised of the following:

* **The use of Bliss Unicode code points to encode a concept.**

  A font then maps these code points into the appropriate symbol for the user.

  The code points are under Unicode Consortium review.

* **A registry of concepts (BCI code point sets) for authors to look up.**

  The W3C AAC Symbol Registry provides the code points used to identify a given concept.

* **Use of the `<ruby>` element for presentation&mdash;with an attribute to indicate this is a symbol.**

  The idea is that the browser will not display such elements by default, but will do if the user has expressed a preference for symbols to be shown.

Here's an example of what some mark-up might look like (you would need a font that supports Bliss' code points in order for this to render correctly)...

```html
<p>A nice <ruby type=symbol>cup<rt>@@@</rt></ruby> of <ruby type=symbol>tea<rt>@@@</rt></ruby>.</p>
```

### Demo

A proof-of-concept authoring tool demo can be found at: http://matatk.agrip.org.uk/adaptable-content-authoring-tool/editor/

Please note the following limitations:

* It only supports Bliss symbols.

* The given example does not represent the typical use case of sparse use of symbols, mainly to annotate content such as media chapters.

## Goals

* Allow content authors to add element-level metadata that link parts of the content to well-known concepts. This, in turn, supports the user need of having content annotated with symbols that the user can understand.

## Out of scope

* Mapping from the concepts to the appropriate symbols for the user, and rendering those symbols (this is left to the UA, or an extension).

* Providing translation&mdash;the concepts are specified by the author to match the language of the page's content; if the page content were to be translated, the concepts would need to be translated too.

* Providing an exhaustive list of concepts (the [W3C AAC Symbol Registry](#the-w3c-aac-symbol-registry), described below, aims to do this).

## Important notes on symbols and rendering

Though rendering is out of scope, it's important to be aware of the nature of symbols, and different symbol sets:

* Symbols are graphical objects (i.e. vector or bitmap images).

* A concept (e.g. "tea") may map to zero or more symbols in any given symbol set (zero is a possibility because the symbol set may not _have_ a symbol for a particular concept).

* A concept will not necessarily map to the same number of symbols across symbol sets.

## User research

> [!NOTE]
> This work has been developed over several years, with input from the Cognitive Accessibility TF, and experts from BCI. We will add references to some key elements of that background work here.

## Use of Bliss Unicode code points

> [!NOTE]
> This section to be completed.

### Content author's perspective

> [!NOTE]
> This section to be completed.

### Symbol providers' perspective

> [!NOTE]
> This section to be completed.

### Browser implementers' perspective

> [!NOTE]
> This section to be completed.

### Unicode perspective

> [!NOTE]
> This section to be completed.

### Managing changes

> [!NOTE]
> This section to be completed.

## The W3C AAC Symbol Registry

> [!NOTE]
> We are planning to split this explainer off into a separate file, to avoid explainers that are too long.

The registry brings BCI's dictionary of concepts into W3C space. Each record in the registry contains:

* A uniquely-identifying key.

* A description of the concept in a written language (e.g. English).

* The Bliss symbol(s) that embody this concept in the Bliss language.

The registry can be found at: https://www.w3.org/TR/aac-registry/

> [!NOTE]
> The registry's key for identifying concepts is presently the concepts' BCI concept ID (an integer). However, as discussed above, we are in discussions with potential implementers on whether the corresponding Bliss Unicode code point(s) for a given concept could be used instead.

## Extending `<ruby>` to support "symbol" content

> [!NOTE]
> This section to be completed.

There is [a proposal to extend the `<ruby>` element to indicate when "symbol" content is being used](https://github.com/w3c/html-ruby/issues/24).

## Privacy considerations

> [!NOTE]
> This section is to be expanded.

It would be possible for a site to know that symbols are being displayed.

The site could also find out which font is being used.

> [!NOTE]
> Double-check on font detection.

## Considered alternatives

> [!NOTE]
> This section is to be made more concise (after the outcome of the workshop has been incorporated into the primary sections above), and have any additional alternative approaches added.

### The `adapt-symbol` attribute

The intent of the `adapt-symbol` attribute is to link a _concept_ (for which the UA will render an appropriate symbol for the user) to some content (usually text) on the page.

The value of the `adapt-symbol` attribute is a representation of a concept, which will be rendered as one or more symbols by the UA. There are several ways that the concepts may be encoded, which is the subject of current discussion.

#### Mapping concepts to symbols (in general)

There are a number of ways we may identify, or "key", concepts&mdash;some alternatives are discussed below.

Regardless, the overall appraoch for using the attribute would be the same:

1. The goal of the `adapt-symbol` attribute is to match some content (e.g. a word, or a video chapter title) to the appropriate symbol(s) for the user.

2. This is done by having the author specifcy the _concept_ that the content relates to.

3. The concept may map, in any given symbol set, to one or more symbols (or zero symbols, if the set has no symbol for that concept).

4. The rendering of symbols would be down to the UA&mdash;we have made a demo, and are working on a visual layout test suite.

Therefore, setting aside the means of identifying concepts, the basic markup would be as follows.

```html
<p>Would you care for some <span adapt-symbol="CONCEPT_ID">tea</span>?</p>
```

The following sections compare ways to identify concepts. For now, let's assume they will be integers.

Here are three examples of how the `adapt-symbol` attribute could be used.

1.  Symbols for individual words.

    ```html
    <span adapt-symbol="13621">Cup</span> of <span adapt-symbol="17511">Tea</span>
    ```

2.  Symbols used with an image (`alt` text represented as a symbol).

    ```html
    <img src="cup.png" adapt-symbol="13621" alt="Cup"/>
    ```

3.  Symbols with conjugation. In this example a symbol is used for "her
    name" for the conjugated Hebrew word, <span lang="he"
    dir="rtl">&#1513;&#1502;&#1492;</span>. The comma is used to join the conjugated values, "her" (14707) and "name"
    (15691). If the gender is not important, you can just use the value
    for name (15691).

    ```html
    <img src="her-name.png" alt="שמה" adapt-symbol="15691, 14707"/>
    ```

#### Concept IDs: keying schemes

There is [ongoing discussion on how the concepts should be expressed in the HTML markup in issue 240](https://github.com/w3c/adapt/issues/240). This section makes three suggestions.

##### BCI concept IDs as attribute values

***This keying scheme maps one integer (the BCI concept ID) to a concept.***

BCI maintains a dictionry of concepts, with corresponding Bliss symbols, and written-language definitions.

###### Advantages

* Simple&mdash;provides a 1:1 mapping between concept and key that identifies the concept.

* Does not expose implementation details of Bliss symbols to content authors.

* Relatively minimal lag time between a concept addition/update and availability via authoring tools, or the W3C AAC Symbol Registry.

###### Disadvantages

* Allows us to only specify concepts available in the Bliss language. (But we can still map to any symbol set, based on those concepts.)

##### Bliss characters' Unicode representations as attribute values

***This maps one or more representations of Bliss characters (symbols) to a concept.***

Instead of BCI concept IDs (integers), we could use:

* Unicode code points for Bliss symbols (directly), or

* Hex (or other) representations of Unicode code points that correspond to Bliss symbols.

> [!IMPORTANT]
> Basing the key into the concept dictionary on Bliss characters means that:
>
> * Regardless of the symbol set being used for output, the concept is expressed in terms of Bliss symbols.
>
> * The values used relate to the Unicode code points for these Bliss characters. Because there are approximately 6,500 Bliss concepts, but only around 1,400 Bliss characters being added to Unicode, this means that some concept identifiers will need to contain multiple Bliss character representations.

> [!NOTE]
> Further details can be found in our comment on issue 240 (this comment only suggest the user of code points directly, though): <https://github.com/w3c/adapt/issues/240#issuecomment-2126679208>.

###### Advantages

* Based on an existing standard (Unicode).

###### Disadvantages

* Exposes the implementation details of Bliss to someone writing this markup.

  - As part of this, it's more complex than using atomic keys (such as BCI concept IDs): some concepts that would be represented by one BCI ID would need more than one Bliss character representation to identify them.

###### Unknown factors

* Unclear as to what the process for adding additional Bliss characters to Unicode would be.

* The time between new concepts being added to Bliss, and them being available via Unicode would likely be significant, due to the release cadence of Unicode.

#### Multiple concepts per attribute value

Though it is not expected to be used extensively, we have considered how multiple concepts may be referenced within one attribute value.

As separate Bliss characters (or their representations) are space-separated, it is proposed that if multiple concepts were to be included in a single `adapt-symbol` attribute value, they would be comma-separated. For example:

```html
<span adapt-symbol="0x4242, 8857, 0x4444 0x2222, 3856"
```

In this example, there are 4 concepts identified, via...

* hex representation of a single Bliss Unicode code point;

* Bliss Concept ID;

* hex representation of a concept that is identified by two Bliss Unicode code points; or

* another Bliss Concept ID.

> [!NOTE]
> We want to maintain consitency with how other parts of the platform handle this&mdash;we're very-much open to using other delimiters if needed.

#### Looking up concepts

The content author needs to be able to find known concepts, and their associated identifier. This is addressed in the next section.

## Stakeholder feedback/opposition

Our work is currently focused on working with BCI within W3C to solidify our recommendations for the syntax of the `adapt-symbol` attribute. We have run several breakouts on the work, and will more actively seek feedback once this is decided.

Through prior TPAC meetings, and [issue 240](), we have been discussing authoring consdierations with WHATWG.

We plan to seek input from implementers following the resolution of the concept keying issue.

We have engaged with experts in the COGA TF regarding the appropriateness of building upon the concepts identified by BCI&mdash;this work actually began within the COGA TF, with the input of renowned experts on AAC and symbols. Bliss is used because it is comprehensive, and has a mature process for the addition and updating of concepts.

## References

> [!NOTE]
> This section to be added.

## Acknowledgments

* Lisa Seeman, COGA TF

* Russell Galvin, BCI

* WAI-Adapt TF participants
