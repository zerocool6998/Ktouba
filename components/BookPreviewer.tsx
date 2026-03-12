import React, { useState, useRef, useEffect } from 'react';
import { Product } from '../types';
import Markdown from 'react-markdown';
import { db } from '../firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';

const tocItems = [
  "Introduction: Why Minimalism Matters",
  "The Philosophy of Minimalist Design",
  "Understanding Visual Clutter",
  "The Power of Whitespace",
  "Typography as a Design System",
  "Color and Attention Management",
  "The Art of Subtraction",
  "Minimalism in Web Design",
  "Minimalism in Product Design",
  "Designing for User Experience",
  "A Practical Workflow for Minimalist Designers",
  "Real-World Minimalist Design Patterns",
  "Common Mistakes in Minimalism",
  "The Psychology of Cognitive Load",
  "Minimalist Copywriting",
  "The Luxury of Less",
  "The Future of Minimalist Design",
  "Final Thoughts"
];

const chaptersData = [
  {
    id: 'intro',
    number: 'Introduction',
    title: 'Why Minimalism\nMatters',
    content: (
      <>
        <p>We live in the most visually crowded digital environment in history. Every interface competes for attention with notifications, advertisements, social feeds, and messaging apps.</p>
        <p>The modern user is overwhelmed. In this environment, <strong>clarity becomes valuable.</strong></p>
        <p>Minimalist design is the discipline of removing everything that does not help the user accomplish their goal. It is not about empty screens or aesthetic trends. It is about <strong>focus.</strong></p>
        <p>A good minimalist interface allows users to:</p>
        <ul className="list-none space-y-1.5 border-l-2 border-[#FF4400] pl-4 ml-1 text-[#525252]">
          <li>understand information faster</li>
          <li>navigate with less effort</li>
          <li>focus on meaningful actions</li>
          <li>experience calm instead of overload</li>
        </ul>
        <p>Minimalism transforms complexity into clarity.</p>
        <p>In this book you will learn how minimalist design works in practice, including whitespace systems, typography hierarchy, color management, and practical workflows.</p>
        <p>Minimalism is not about having less. It is about making <strong>every element matter more.</strong></p>
      </>
    )
  },
  {
    id: 'chapter1',
    number: 'Chapter One',
    title: 'The Philosophy\nof Minimalism',
    content: (
      <>
        <p>Minimalism originally emerged in <strong>art and architecture</strong>, where creators began rejecting decorative excess.</p>
        <p>Artists reduced their work to essential shapes and structures. Architects removed ornamentation and focused on function.</p>
        <p>Digital design adopted this philosophy.</p>
        <p>Minimalist design rests on three core principles:</p>
        <p><strong>1. Clarity</strong><br/>Users should immediately understand an interface. Confusion is a design failure.</p>
        <p><strong>2. Function First</strong><br/>Design exists to serve usability. A beautiful interface that frustrates users is not successful design.</p>
        <p><strong>3. Intentional Design</strong><br/>Every element must justify its existence. A minimalist designer constantly asks:</p>
        <ul className="list-none space-y-1.5 border-l-2 border-[#FF4400] pl-4 ml-1 text-[#525252]">
          <li>Does this help the user?</li>
          <li>Does it improve clarity?</li>
          <li>Is it necessary?</li>
        </ul>
        <p>If the answer is no, the element should disappear.</p>
        <p>Minimalism is not a style. It is a <strong>decision-making philosophy.</strong></p>
      </>
    )
  },
  {
    id: 'chapter2',
    number: 'Chapter Two',
    title: 'Understanding\nVisual Clutter',
    content: [
      <React.Fragment key="p1">
        <p>Visual clutter appears when too many elements compete for attention.</p>
        <p>Common causes include:</p>
        <ul className="list-none space-y-1.5 border-l-2 border-[#FF4400] pl-4 ml-1 text-[#525252]">
          <li>too many colors</li>
          <li>excessive typography styles</li>
          <li>unnecessary icons</li>
          <li>crowded spacing</li>
          <li>multiple competing calls-to-action</li>
        </ul>
        <p>When clutter increases, cognitive effort increases.</p>
        <p>Users must scan the interface longer to find what they need. This creates friction.</p>
      </React.Fragment>,
      <React.Fragment key="p2">
        <p>Friction leads to frustration. Frustration leads to abandonment.</p>
        <p>Minimalist design reduces clutter by <strong>guiding attention intentionally.</strong></p>
        <p>Instead of presenting everything equally, minimalist design establishes hierarchy.</p>
        <p>Users should know instantly:</p>
        <ul className="list-none space-y-1.5 border-l-2 border-[#FF4400] pl-4 ml-1 text-[#525252]">
          <li>what matters</li>
          <li>where to look</li>
          <li>what action to take</li>
        </ul>
        <p>Clarity always beats complexity.</p>
      </React.Fragment>
    ]
  },
  {
    id: 'chapter3',
    number: 'Chapter Three',
    title: 'The Power of\nWhitespace',
    content: [
      <React.Fragment key="p1">
        <p>Whitespace (also called <strong>negative space</strong>) is one of the most powerful tools in minimalist design.</p>
        <p>Whitespace refers to empty areas surrounding elements.</p>
        <p>Examples include space between:</p>
        <ul className="list-none space-y-1.5 border-l-2 border-[#FF4400] pl-4 ml-1 text-[#525252]">
          <li>paragraphs</li>
          <li>images</li>
          <li>buttons</li>
          <li>sections</li>
          <li>margins</li>
        </ul>
        <p>Whitespace performs four critical functions.</p>
        <p><strong>1. Readability</strong></p>
        <p>Text becomes easier to read when surrounded by space. Crowded text increases fatigue.</p>
      </React.Fragment>,
      <React.Fragment key="p2">
        <p><strong>2. Visual Hierarchy</strong></p>
        <p>Spacing shows relationships between elements. Large spacing separates sections. Small spacing groups related items.</p>
        <p><strong>3. Focus</strong></p>
        <p>Whitespace draws attention to the element it surrounds. A button placed in open space becomes more visible.</p>
        <p><strong>4. Perceived Quality</strong></p>
        <p>Luxury brands use large amounts of whitespace. Spacing creates elegance and confidence.</p>
        <p>Whitespace is not empty. It is <strong>visual breathing room.</strong></p>
      </React.Fragment>
    ]
  },
  {
    id: 'chapter4',
    number: 'Chapter Four',
    title: 'Typography as a\nDesign System',
    content: [
      <React.Fragment key="p1">
        <p>In minimalist design, typography becomes a primary visual element.</p>
        <p>Without heavy graphics, text must communicate both <strong>information and hierarchy.</strong></p>
        <p>A strong typography system includes:</p>
        <p><strong>Limited Fonts</strong></p>
        <p>Most minimalist systems use <strong>one or two fonts.</strong> Too many fonts create noise.</p>
        <p><strong>Clear Hierarchy</strong></p>
        <p>Users scan before reading. Typography should guide them through the interface.</p>
      </React.Fragment>,
      <React.Fragment key="p2">
        <p>Typical hierarchy:</p>
        <ul className="list-none space-y-1.5 border-l-2 border-[#FF4400] pl-4 ml-1 text-[#525252]">
          <li>Headline</li>
          <li>Subheadline</li>
          <li>Section title</li>
          <li>Body text</li>
          <li>Caption</li>
        </ul>
        <p><strong>Readability</strong></p>
        <p>Typography should be comfortable. Important factors include:</p>
        <ul className="list-none space-y-1.5 border-l-2 border-[#FF4400] pl-4 ml-1 text-[#525252]">
          <li>line height</li>
          <li>character spacing</li>
          <li>paragraph width</li>
          <li>font size</li>
        </ul>
        <p>When typography works well, the user barely notices it. They simply read.</p>
      </React.Fragment>
    ]
  },
  {
    id: 'chapter5',
    number: 'Chapter Five',
    title: 'Color and Attention\nManagement',
    content: (
      <>
        <p>Minimalist interfaces often rely on <strong>limited color palettes.</strong></p>
        <p>Instead of decoration, color becomes a functional tool.</p>
        <p>A common approach is the <strong>60-30-10 rule.</strong></p>
        <p><strong>60% Base Color</strong></p>
        <p>Usually white or light gray. This forms the background.</p>
        <p><strong>30% Secondary Color</strong></p>
        <p>Used for structure:</p>
        <ul className="list-none space-y-1.5 border-l-2 border-[#FF4400] pl-4 ml-1 text-[#525252]">
          <li>icons</li>
          <li>borders</li>
          <li>secondary text</li>
        </ul>
        <p><strong>10% Accent Color</strong></p>
        <p>Reserved for key actions:</p>
        <ul className="list-none space-y-1.5 border-l-2 border-[#FF4400] pl-4 ml-1 text-[#525252]">
          <li>buttons</li>
          <li>links</li>
          <li>highlights</li>
        </ul>
        <p>The rule is simple: If everything is colorful, nothing stands out.</p>
        <p>Minimalist color systems make <strong>important elements obvious.</strong></p>
      </>
    )
  },
  {
    id: 'chapter6',
    number: 'Chapter Six',
    title: 'The Art of\nSubtraction',
    content: (
      <>
        <p>One of the hardest skills in design is <strong>removing elements.</strong></p>
        <p>Designers often begin with a complex interface. The subtraction process gradually simplifies it.</p>
        <p>The process:</p>
        <ol className="list-decimal pl-4 space-y-1.5 text-[#525252] font-medium">
          <li>Build the full layout</li>
          <li>Identify unnecessary elements</li>
          <li>Remove them one by one</li>
          <li>Test usability</li>
        </ol>
        <p>Elements frequently removed include:</p>
        <ul className="list-none space-y-1.5 border-l-2 border-[#FF4400] pl-4 ml-1 text-[#525252]">
          <li>decorative icons</li>
          <li>extra borders</li>
          <li>redundant text</li>
          <li>unnecessary animations</li>
        </ul>
        <p>Each removal increases clarity.</p>
        <p>Minimalism is not emptiness. It is <strong>precision.</strong></p>
      </>
    )
  },
  {
    id: 'chapter7',
    number: 'Chapter Seven',
    title: 'Minimalism in\nWeb Design',
    content: (
      <>
        <p>Minimalist principles work particularly well for websites.</p>
        <p>Modern users prefer fast, focused experiences.</p>
        <p>Key characteristics of minimalist web design include:</p>
        <p><strong>Focused Landing Pages</strong></p>
        <p>Each page should guide users toward one main action.</p>
        <p><strong>Simple Navigation</strong></p>
        <p>Navigation menus should contain only essential items.</p>
        <p><strong>Strong Visual Hierarchy</strong></p>
        <p>Headlines and imagery guide attention naturally.</p>
        <p><strong>Faster Performance</strong></p>
        <p>Minimalist websites often load faster due to fewer assets. Speed directly improves user experience.</p>
      </>
    )
  },
  {
    id: 'chapter8',
    number: 'Chapter Eight',
    title: 'Minimalism in\nProduct Design',
    content: (
      <>
        <p>Applications and digital tools benefit enormously from minimalist design.</p>
        <p>Users expect products that are intuitive and efficient.</p>
        <p>Key principles include:</p>
        <p><strong>Progressive Disclosure</strong></p>
        <p>Information appears only when needed. Users are not overwhelmed by options.</p>
        <p><strong>Focused Screens</strong></p>
        <p>Each screen should have one purpose.</p>
        <p><strong>Consistent Patterns</strong></p>
        <p>Buttons and controls behave the same across the product. Consistency reduces learning time.</p>
        <p>Minimalism turns complex tools into approachable systems.</p>
      </>
    )
  },
  {
    id: 'chapter9',
    number: 'Chapter Nine',
    title: 'Designing for\nUser Experience',
    content: (
      <>
        <p>Minimalism must always support usability.</p>
        <p>Design should help users achieve their goal quickly.</p>
        <p>Effective UX includes:</p>
        <ul className="list-none space-y-1.5 border-l-2 border-[#FF4400] pl-4 ml-1 text-[#525252]">
          <li>clear navigation</li>
          <li>predictable interactions</li>
          <li>logical layout</li>
          <li>visible feedback</li>
        </ul>
        <p>Minimalism works best when designers understand <strong>user intent.</strong></p>
        <p>A simple interface that supports real needs becomes powerful.</p>
      </>
    )
  },
  {
    id: 'chapter10',
    number: 'Chapter Ten',
    title: 'A Practical\nWorkflow',
    content: [
      <React.Fragment key="p1">
        <p>Minimalist interfaces do not happen by accident. They are the result of disciplined decisions and a structured workflow.</p>
        <p>Most designers believe minimalism means "making things look clean." In reality, minimalism is about <strong>removing everything that does not serve the user's goal.</strong></p>
        <p>This chapter breaks down a practical workflow used by experienced product designers to build minimalist interfaces that are both elegant and functional.</p>
        <p><strong>Phase 1: The "Why" Audit</strong><br/>(Before You Open Figma)</p>
        <p>Many designers begin by searching for inspiration on design galleries. This is often the first mistake.</p>
        <p>When you start with visual inspiration, you risk copying a <strong>style</strong> without understanding the <strong>logic</strong> behind it.</p>
        <p>Before opening any design software, you must answer one fundamental question:</p>
        <p><strong>What is the single most important action on this screen?</strong></p>
        <p>Every screen should guide the user toward one dominant goal.</p>
        <p>If a screen contains two "primary" buttons, it has no primary button at all. The user experiences hesitation, and hesitation slows interaction.</p>
      </React.Fragment>,
      <React.Fragment key="p2">
        <p><strong>The Rule of One</strong><br/>Every screen must have <strong>one dominant focal point.</strong></p>
        <p>This focal point is usually:</p>
        <ul className="list-none space-y-1.5 border-l-2 border-[#FF4400] pl-4 ml-1 text-[#525252]">
          <li>a call-to-action</li>
          <li>a form submission</li>
          <li>a navigation decision</li>
          <li>a content interaction</li>
        </ul>
        <p>Anything that distracts from this goal weakens the interface.</p>
        <p><strong>The Feature Audit</strong><br/>Clients often request many features. Designers must prioritize them.</p>
        <p>Follow this process:</p>
        <ol className="list-decimal pl-4 space-y-1.5 text-[#525252] font-medium">
          <li>List every requested feature.</li>
          <li>Rank them based on actual user needs.</li>
          <li>Identify the <strong>top 20% of features</strong> that deliver the most value.</li>
        </ol>
        <p>Features outside this group should not receive visual priority.</p>
      </React.Fragment>,
      <React.Fragment key="p3">
        <p>Instead they should be:</p>
        <ul className="list-none space-y-1.5 border-l-2 border-[#FF4400] pl-4 ml-1 text-[#525252]">
          <li>placed in secondary menus</li>
          <li>grouped under "More"</li>
          <li>or removed entirely</li>
        </ul>
        <p>Minimalist design is not about hiding features.</p>
        <p>It is about <strong>prioritizing what matters most.</strong></p>
        <p><strong>Phase 2: Building the Invisible Skeleton</strong></p>
        <p>Minimalist design depends heavily on alignment and spacing. Even small inconsistencies create subtle visual noise.</p>
        <p>Users may not consciously notice this noise, but their brain will perceive the interface as messy or unpolished.</p>
        <p>To eliminate guesswork, professional designers use the <strong>8-point grid system.</strong></p>
        <p><strong>Why 8?</strong><br/>Most screen resolutions divide evenly by eight. This allows layouts to scale smoothly across devices and screen sizes.</p>
      </React.Fragment>,
      <React.Fragment key="p4">
        <p><strong>The Core Rule</strong><br/>All spacing must follow a simple formula:</p>
        <p><strong>Spacing = 8 × n</strong></p>
        <p>Where <strong>n</strong> is any whole number.</p>
        <p>Examples:</p>
        <ul className="list-none space-y-1.5 border-l-2 border-[#FF4400] pl-4 ml-1 text-[#525252]">
          <li>Small spacing: 8px or 16px</li>
          <li>Medium spacing: 24px or 32px</li>
          <li>Large spacing: 64px or 80px</li>
          <li>Section spacing: 120px or more</li>
        </ul>
        <p><strong>Why This Matters</strong><br/>When designers follow a consistent spacing system:</p>
        <ul className="list-none space-y-1.5 border-l-2 border-[#FF4400] pl-4 ml-1 text-[#525252]">
          <li>alignment becomes predictable</li>
          <li>layouts feel structured</li>
          <li>interfaces gain visual rhythm</li>
        </ul>
        <p>The brain interprets this rhythm as <strong>simplicity and order.</strong></p>
        <p>Minimalism is not just about removing elements. It is also about <strong>organizing what remains.</strong></p>
      </React.Fragment>,
      <React.Fragment key="p5">
        <p><strong>Phase 3: Typography Hierarchy</strong></p>
        <p>In minimalist interfaces, typography becomes the dominant visual system.</p>
        <p>Without decorative elements or heavy graphics, text carries most of the communication.</p>
        <p>In many minimalist products, <strong>text represents nearly 70% of the interface.</strong></p>
        <p>If the typography fails, the design fails.</p>
        <p><strong>Choose One Font</strong><br/>Minimalist systems rarely require complex font pairings.</p>
        <p>A single high-quality sans-serif typeface is usually sufficient.</p>
        <p>Common choices include:</p>
        <ul className="list-none space-y-1.5 border-l-2 border-[#FF4400] pl-4 ml-1 text-[#525252]">
          <li>Inter</li>
          <li>Roboto</li>
          <li>Helvetica-style families</li>
        </ul>
        <p>Consistency is more important than variety.</p>
      </React.Fragment>,
      <React.Fragment key="p6">
        <p><strong>The Three-Weight System</strong><br/>A simple typographic structure often includes three weights:</p>
        <p><strong>Bold or Heavy</strong><br/>Used for headlines and major titles.</p>
        <p><strong>Regular</strong><br/>Used for body text.</p>
        <p><strong>Medium or Semi-Bold</strong><br/>Used for UI labels and buttons.</p>
        <p>This structure creates hierarchy without introducing visual chaos.</p>
        <p><strong>Use Meaningful Size Differences</strong><br/>Small differences between text sizes often appear accidental.</p>
        <p>Avoid minor increments such as: 14px → 15px → 16px</p>
        <p>Instead use clearly defined jumps.</p>
        <p>Example scale:</p>
        <ul className="list-none space-y-1.5 border-l-2 border-[#FF4400] pl-4 ml-1 text-[#525252]">
          <li>Caption – 14px</li>
          <li>Body – 16px</li>
          <li>Subheading – 24px</li>
          <li>Header – 48px</li>
        </ul>
        <p>These jumps create visual hierarchy that users can scan instantly.</p>
      </React.Fragment>,
      <React.Fragment key="p7">
        <p><strong>Phase 4: The 60–30–10 Color Rule</strong></p>
        <p>Color in minimalist interfaces is not decorative. It is a tool for <strong>directing attention.</strong></p>
        <p>A widely used structure is the <strong>60–30–10 rule.</strong></p>
        <p><strong>60% Neutral Base</strong><br/>This is typically white, off-white, or light gray. It forms the background of the interface.</p>
        <p><strong>30% Secondary Color</strong><br/>This layer supports structure. It is often used for:</p>
        <ul className="list-none space-y-1.5 border-l-2 border-[#FF4400] pl-4 ml-1 text-[#525252]">
          <li>borders</li>
          <li>icons</li>
          <li>secondary text</li>
          <li>separators</li>
        </ul>
        <p>Usually this is a darker gray or muted tone.</p>
        <p><strong>10% Accent Color</strong><br/>The accent color is the <strong>attention trigger.</strong> It is reserved for:</p>
        <ul className="list-none space-y-1.5 border-l-2 border-[#FF4400] pl-4 ml-1 text-[#525252]">
          <li>primary call-to-action buttons</li>
          <li>active states</li>
          <li>key highlights</li>
        </ul>
      </React.Fragment>,
      <React.Fragment key="p8">
        <p><strong>The Critical Rule</strong><br/>If the accent color appears everywhere, it stops functioning as an accent.</p>
        <p>A strong minimalist interface often contains <strong>only one visually dominant color.</strong></p>
        <p>This ensures that interactive elements are immediately recognizable.</p>
        <p><strong>Phase 5: The "Murder Your Darlings" Subtraction Process</strong></p>
        <p>Once the layout is complete, the real minimalist work begins.</p>
        <p>Designers must remove unnecessary elements until only essential components remain.</p>
        <p>A useful technique is the <strong>Five-Second Rule.</strong></p>
        <p>Look at each element and ask:</p>
        <p><em>If this disappears, will the interface still function?</em></p>
        <p>If the answer is yes, it should probably be removed.</p>
        <p><strong>Remove Borders</strong><br/>Many interfaces rely heavily on divider lines. Often these can be replaced with <strong>spacing and alignment.</strong></p>
        <p>Whitespace can separate content more elegantly than thin gray lines.</p>
      </React.Fragment>,
      <React.Fragment key="p9">
        <p><strong>Reduce Icons</strong><br/>Icons are frequently overused.</p>
        <p>If the word "Home" is already written in the navigation menu, the house icon may be unnecessary.</p>
        <p>Icons should clarify meaning, not duplicate it.</p>
        <p><strong>Avoid Decorative Shadows</strong><br/>Drop shadows are commonly used to simulate depth.</p>
        <p>However, many interfaces can achieve hierarchy through:</p>
        <ul className="list-none space-y-1.5 border-l-2 border-[#FF4400] pl-4 ml-1 text-[#525252]">
          <li>contrast</li>
          <li>spacing</li>
          <li>size differences</li>
        </ul>
        <p>Minimalism favors structural clarity over visual decoration.</p>
        <p><strong>Simplify Language</strong><br/>Minimalist design also applies to words.</p>
        <p>Example: "Click here to sign up for our newsletter."</p>
        <p>Simplified: "Join us."</p>
        <p>Clear language supports clear design.</p>
      </React.Fragment>,
      <React.Fragment key="p10">
        <p><strong>Phase 6: Prototyping Friction</strong></p>
        <p>Minimalism sometimes creates interfaces that are <strong>too effortless</strong>, which can lead to accidental actions.</p>
        <p>Designers must distinguish between helpful simplicity and dangerous oversimplification.</p>
        <p><strong>Negative Friction</strong><br/>Actions with serious consequences should not be overly easy.</p>
        <p>Examples include:</p>
        <ul className="list-none space-y-1.5 border-l-2 border-[#FF4400] pl-4 ml-1 text-[#525252]">
          <li>deleting an account</li>
          <li>cancelling a subscription</li>
          <li>removing important data</li>
        </ul>
        <p>In these cases, the interface should introduce <strong>intentional resistance</strong>, such as confirmation dialogs.</p>
        <p><strong>Intentional Friction</strong><br/>Sometimes adding a step improves usability.</p>
        <p>For example: A confirmation modal prevents destructive mistakes.</p>
        <p>Minimalism should not eliminate necessary safeguards.</p>
        <p>The goal is <strong>clarity</strong>, not recklessness.</p>
      </React.Fragment>
    ]
  },
  {
    id: 'chapter11',
    number: 'Chapter Eleven',
    title: 'Real-World\nPatterns',
    content: [
      <React.Fragment key="p1">
        <p>Minimalist interfaces often rely on a small set of recurring design patterns.</p>
        <p>Understanding these patterns helps designers apply minimalism effectively.</p>
        <p><strong>The Card Pattern</strong></p>
        <p>Traditional card layouts often include:</p>
        <ul className="list-none space-y-1.5 border-l-2 border-[#FF4400] pl-4 ml-1 text-[#525252]">
          <li>borders</li>
          <li>shadows</li>
          <li>colored backgrounds</li>
        </ul>
        <p>A minimalist card removes most of these elements.</p>
        <p>Instead it relies on:</p>
        <ul className="list-none space-y-1.5 border-l-2 border-[#FF4400] pl-4 ml-1 text-[#525252]">
          <li>strong typography</li>
          <li>a clear image</li>
          <li>generous whitespace</li>
        </ul>
        <p>The boundary of the card becomes implied rather than explicitly drawn.</p>
      </React.Fragment>,
      <React.Fragment key="p2">
        <p><strong>Contextual Navigation</strong></p>
        <p>Many modern interfaces hide navigation elements until the user needs them.</p>
        <p>For example, on long article pages:</p>
        <ul className="list-none space-y-1.5 border-l-2 border-[#FF4400] pl-4 ml-1 text-[#525252]">
          <li>the navigation bar disappears while scrolling down</li>
          <li>it reappears when the user scrolls upward</li>
        </ul>
        <p>This approach keeps the interface focused on content while preserving accessibility.</p>
        <p>This technique is sometimes called <strong>invisible UI.</strong></p>
        <p><strong>The Zero State</strong></p>
        <p>The first experience of an application often occurs before the user has created any content.</p>
        <p>This empty condition is known as the <strong>zero state.</strong></p>
        <p>Poorly designed products display a blank screen filled with instructions.</p>
        <p>A better minimalist approach includes:</p>
        <ul className="list-none space-y-1.5 border-l-2 border-[#FF4400] pl-4 ml-1 text-[#525252]">
          <li>one illustration</li>
          <li>one sentence explaining the feature</li>
          <li>one clear button to begin</li>
        </ul>
        <p>The goal is to guide the user toward action without overwhelming them with explanations.</p>
      </React.Fragment>
    ]
  },
  {
    id: 'chapter12',
    number: 'Chapter Twelve',
    title: 'Common Mistakes\nin Minimalism',
    content: [
      <React.Fragment key="p1">
        <p>Minimalism can fail when designers misunderstand its purpose.</p>
        <p>The following mistakes frequently lead to unusable interfaces.</p>
        <p><strong>Low Contrast</strong></p>
        <p>Some minimalist interfaces use extremely light color palettes.</p>
        <p>If text and background contrast is too low, readability suffers.</p>
        <p>Accessibility guidelines recommend a contrast ratio of <strong>at least 4.5:1</strong> for body text.</p>
        <p><strong>Mystery Navigation</strong></p>
        <p>When clickable elements look identical to static text, users cannot identify interactive components.</p>
      </React.Fragment>,
      <React.Fragment key="p2">
        <p>Subtle cues should indicate clickability:</p>
        <ul className="list-none space-y-1.5 border-l-2 border-[#FF4400] pl-4 ml-1 text-[#525252]">
          <li>color changes</li>
          <li>underlines</li>
          <li>hover states</li>
          <li>motion feedback</li>
        </ul>
        <p><strong>Over-Simplified Icons</strong></p>
        <p>Icons that are too abstract may lose their meaning.</p>
        <p>If users cannot recognize an icon within one second, the design should include a label.</p>
        <p><strong>The "Empty Wireframe" Problem</strong></p>
        <p>Minimalist layouts can sometimes appear unfinished.</p>
        <p>The solution is not to add clutter but to improve <strong>asset quality.</strong></p>
        <p>High-quality photography, well-designed typography, and consistent spacing make minimal interfaces feel premium.</p>
      </React.Fragment>
    ]
  },
  {
    id: 'chapter13',
    number: 'Chapter Thirteen',
    title: 'The Psychology of\nCognitive Load',
    content: [
      <React.Fragment key="p1">
        <p>Human attention is limited. The brain cannot process unlimited information at once.</p>
        <p>In user experience design, <strong>cognitive load</strong> refers to the amount of mental effort required to understand and interact with a system.</p>
        <p>Every interface element competes for this limited mental capacity.</p>
        <p>Popups, banners, unnecessary icons, and clutter all increase cognitive load.</p>
        <p>When cognitive load becomes too high, users disengage.</p>
        <p>They leave the page, close the app, or abandon the task entirely.</p>
        <p>Designers must therefore understand the three types of cognitive load.</p>
        <p><strong>Intrinsic Load</strong></p>
        <p>This is the inherent difficulty of the task.</p>
        <p>Some tasks are naturally complex, such as filing taxes or configuring financial settings.</p>
        <p>Design cannot eliminate intrinsic complexity entirely.</p>
      </React.Fragment>,
      <React.Fragment key="p2">
        <p><strong>Germane Load</strong></p>
        <p>This is the productive mental effort used to learn and understand the interface.</p>
        <p>Good design encourages this type of engagement.</p>
        <p><strong>Extraneous Load</strong></p>
        <p>This is the unnecessary mental effort caused by poor interface design.</p>
        <p>Examples include:</p>
        <ul className="list-none space-y-1.5 border-l-2 border-[#FF4400] pl-4 ml-1 text-[#525252]">
          <li>inconsistent layouts</li>
          <li>confusing navigation</li>
          <li>cluttered visual hierarchy</li>
        </ul>
        <p>The mission of minimalist design is simple:</p>
        <p><strong>Remove as much extraneous load as possible.</strong></p>
      </React.Fragment>,
      <React.Fragment key="p3">
        <p><strong>Hick's Law</strong></p>
        <p>Hick's Law explains how decision time increases as the number of choices grows.</p>
        <p>When users face too many options, they hesitate.</p>
        <p>More options do not always create more value.</p>
        <p>Instead they often produce <strong>decision fatigue.</strong></p>
        <p>Minimalist interfaces reduce the number of visible choices, helping users act faster.</p>
        <p><strong>Gestalt Principles</strong></p>
        <p>The human brain constantly searches for patterns.</p>
        <p>Gestalt psychology explains how users visually organize information.</p>
        <p>Minimalist design often relies on these principles.</p>
        <p><strong>Proximity</strong><br/>Elements placed near each other appear related.</p>
        <p><strong>Similarity</strong><br/>Elements with similar shapes or colors appear connected.</p>
        <p><strong>Closure</strong><br/>The brain naturally fills in missing shapes, allowing designers to suggest boundaries without drawing them explicitly.</p>
        <p>These principles allow minimalist interfaces to feel structured even when visual elements are minimal.</p>
      </React.Fragment>
    ]
  },
  {
    id: 'chapter14',
    number: 'Chapter Fourteen',
    title: 'Minimalist\nCopywriting',
    content: [
      <React.Fragment key="p1">
        <p>Minimalist design does not stop at layout, spacing, and typography. It also applies to language.</p>
        <p>If the interface is visually clean but the copy is filled with jargon, filler, and marketing clichés, the experience breaks.</p>
        <p>Minimalist copywriting is about saying exactly what needs to be said, using the fewest words necessary, without losing meaning.</p>
        <p>It favors:</p>
        <ul className="list-none space-y-1.5 border-l-2 border-[#FF4400] pl-4 ml-1 text-[#525252]">
          <li>clarity over cleverness</li>
          <li>directness over decoration</li>
          <li>action over abstraction</li>
        </ul>
        <p><strong>Cut the Adjectives</strong></p>
        <p>Many weak interfaces try to compensate with inflated language.</p>
        <p>Examples include:</p>
        <ul className="list-none space-y-1.5 border-l-2 border-[#FF4400] pl-4 ml-1 text-[#525252]">
          <li>revolutionary platform</li>
          <li>industry-leading solution</li>
          <li>world-class experience</li>
        </ul>
        <p>These phrases add noise, not value.</p>
      </React.Fragment>,
      <React.Fragment key="p2">
        <p>A minimalist product does not need inflated language to prove its worth.</p>
        <p>Instead of:</p>
        <p>"Our revolutionary, world-class platform helps modern teams unlock next-level productivity."</p>
        <p>Write:</p>
        <p>"Manage your team's work."</p>
        <p>Simple language sounds more confident because it does not try too hard.</p>
        <p><strong>Front-Load the Meaning</strong></p>
        <p>Users scan text the same way they scan interfaces.</p>
        <p>They want the meaning immediately.</p>
        <p>That means the most important word should appear as early as possible.</p>
        <p>Instead of:</p>
        <p>"To update your account settings, click the gear icon in the top-right corner."</p>
        <p>Write:</p>
        <p>"Open Settings from the gear icon."</p>
        <p>The second version gets to the point faster.</p>
      </React.Fragment>,
      <React.Fragment key="p3">
        <p><strong>Use Active Verbs</strong></p>
        <p>Minimalist interfaces should guide action clearly.</p>
        <p>That requires active language.</p>
        <p>Instead of:</p>
        <p>"The form can be submitted after all fields have been completed."</p>
        <p>Write:</p>
        <p>"Complete all fields, then submit."</p>
        <p>Direct verbs improve usability because they reduce ambiguity.</p>
        <p><strong>Make Buttons Specific</strong></p>
        <p>Generic button labels weaken interfaces.</p>
        <p>Buttons like:</p>
        <ul className="list-none space-y-1.5 border-l-2 border-[#FF4400] pl-4 ml-1 text-[#525252]">
          <li>Submit</li>
          <li>Continue</li>
          <li>Confirm</li>
        </ul>
        <p>can often be improved.</p>
      </React.Fragment>,
      <React.Fragment key="p4">
        <p>More specific alternatives include:</p>
        <ul className="list-none space-y-1.5 border-l-2 border-[#FF4400] pl-4 ml-1 text-[#525252]">
          <li>Create account</li>
          <li>Download guide</li>
          <li>Save changes</li>
          <li>Book demo</li>
        </ul>
        <p>Specific labels reduce hesitation because users know exactly what will happen next.</p>
        <p><strong>Write for Scanning</strong></p>
        <p>People do not read digital products the way they read novels.</p>
        <p>They skim.</p>
        <p>That means copy should be:</p>
        <ul className="list-none space-y-1.5 border-l-2 border-[#FF4400] pl-4 ml-1 text-[#525252]">
          <li>short</li>
          <li>structured</li>
          <li>easy to scan</li>
        </ul>
        <p>Large blocks of text create friction.</p>
        <p>Shorter lines, clearer labels, and stronger headings make interfaces feel lighter.</p>
      </React.Fragment>,
      <React.Fragment key="p5">
        <p><strong>Remove Duplicate Meaning</strong></p>
        <p>Minimalist copywriting also means removing repeated information.</p>
        <p>For example, a heading that says:</p>
        <p>"Newsletter Sign-Up"</p>
        <p>followed by body text that says:</p>
        <p>"Sign up for our newsletter below"</p>
        <p>is partially repetitive.</p>
        <p>A better version could be:</p>
        <p>"Get design updates once a week."</p>
        <p>Now the copy adds value instead of repeating the label.</p>
        <p><strong>Match the Tone to the Interface</strong></p>
        <p>A minimalist visual style usually works best with a calm, precise tone.</p>
        <p>That does not mean the language must be cold.</p>
        <p>It means the tone should be controlled.</p>
      </React.Fragment>,
      <React.Fragment key="p6">
        <p>Confident brands often sound:</p>
        <ul className="list-none space-y-1.5 border-l-2 border-[#FF4400] pl-4 ml-1 text-[#525252]">
          <li>clear</li>
          <li>concise</li>
          <li>useful</li>
          <li>human</li>
        </ul>
        <p>Minimalist writing should feel effortless, not robotic.</p>
        <p><strong>Good Microcopy Builds Trust</strong></p>
        <p>The smallest words in an interface often do the most important work.</p>
        <p>Examples include:</p>
        <ul className="list-none space-y-1.5 border-l-2 border-[#FF4400] pl-4 ml-1 text-[#525252]">
          <li>error messages</li>
          <li>onboarding prompts</li>
          <li>placeholder text</li>
          <li>confirmation messages</li>
          <li>button labels</li>
        </ul>
        <p>Good microcopy removes uncertainty.</p>
      </React.Fragment>,
      <React.Fragment key="p7">
        <p>For example, instead of a vague error like:</p>
        <p>"Something went wrong."</p>
        <p>write:</p>
        <p>"Your password must include at least 8 characters."</p>
        <p>Specificity reduces frustration.</p>
        <p><strong>The Goal of Minimalist Copywriting</strong></p>
        <p>Minimalist copywriting is not about making text short for the sake of being short.</p>
        <p>It is about removing everything that slows understanding.</p>
        <p>The best interface copy feels invisible.</p>
        <p>The user reads it once, understands it instantly, and moves on without friction.</p>
        <p>That is the standard minimalist designers should aim for.</p>
      </React.Fragment>
    ]
  },
  {
    id: 'chapter15',
    number: 'Chapter Fifteen',
    title: 'The Luxury\nof Less',
    content: (
      <>
        <p>Minimalism does more than improve usability.</p>
        <p>It also changes how users perceive value.</p>
        <p>High-density layouts often feel inexpensive because they resemble crowded marketplaces.</p>
        <p>Spacious layouts, in contrast, communicate confidence and quality.</p>
        <p><strong>Density Signals Price</strong></p>
        <p>Crowded pages often suggest discount positioning.</p>
        <p>Spacious pages suggest premium positioning.</p>
        <p>Luxury brands frequently use minimalist design to reinforce exclusivity.</p>
        <p>Large areas of whitespace signal that the brand does not need to compete for attention.</p>
        <p>Instead, it allows the product to stand alone.</p>
        <p><strong>Perception Through Space</strong></p>
        <p>When an interface leaves significant empty space, it tells the user:</p>
        <p>The content here matters.</p>
        <p>Minimalism transforms absence into emphasis.</p>
      </>
    )
  },
  {
    id: 'chapter16',
    number: 'Chapter Sixteen',
    title: 'The Future of\nMinimalist Design',
    content: (
      <>
        <p>As technology grows more complex, minimalism becomes more important.</p>
        <p>Emerging trends include:</p>
        <ul className="list-none space-y-1.5 border-l-2 border-[#FF4400] pl-4 ml-1 text-[#525252]">
          <li>voice interfaces</li>
          <li>AI-driven experiences</li>
          <li>gesture-based interaction</li>
          <li>content-first design</li>
        </ul>
        <p>The challenge of future designers will be managing increasing complexity while preserving simplicity.</p>
        <p>Minimalism will remain essential.</p>
      </>
    )
  },
  {
    id: 'chapter17',
    number: 'Final Thoughts',
    title: '',
    content: [
      <React.Fragment key="p1">
        <div className="flex flex-col items-center justify-center h-full text-center mt-16">
          <div className="w-8 h-[2px] bg-[#FF4400] mb-10"></div>
          <p className="text-[11pt] leading-[18pt] font-medium mb-6 text-[#1A1A1A]">
            Minimalism is not about removing things randomly.
          </p>
          <p className="text-[11pt] leading-[18pt] font-medium mb-6 text-[#1A1A1A]">
            It is about removing everything that weakens clarity.
          </p>
          <p className="text-[11pt] leading-[18pt] font-medium mb-12 text-[#1A1A1A]">
            The best interfaces feel effortless.
          </p>
          <p className="text-[11pt] leading-[18pt] font-medium mb-12 text-[#1A1A1A]">
            Users simply achieve their goals without thinking about the design.
          </p>
          <p className="text-[11pt] leading-[18pt] font-medium mb-12 text-[#1A1A1A]">
            That is the real power of minimalism.
          </p>
          <div className="w-2 h-2 rounded-full bg-[#1A1A1A]"></div>
        </div>
      </React.Fragment>
    ]
  }
];

interface BookPreviewerProps {
  product: Product;
  isPurchased: boolean;
  onBack: () => void;
  onPurchase: () => void;
}

export default function BookPreviewer({ product, isPurchased, onBack, onPurchase }: BookPreviewerProps) {
  const [currentPage, setCurrentPage] = useState('cover');
  const [isIframe, setIsIframe] = useState(false);
  const [overflowErrors, setOverflowErrors] = useState<string[]>([]);
  const [hasTested, setHasTested] = useState(false);
  const [fetchedChapters, setFetchedChapters] = useState<any[]>([]);
  const [loadingChapters, setLoadingChapters] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        let q;
        if (isPurchased) {
          q = query(
            collection(db, 'chapters'),
            where('bookId', '==', product.id)
          );
        } else {
          q = query(
            collection(db, 'chapters'),
            where('bookId', '==', product.id),
            where('isPreview', '==', true)
          );
        }
        const querySnapshot = await getDocs(q);
        const chapters: any[] = [];
        querySnapshot.forEach((doc) => {
          chapters.push({ id: doc.id, ...doc.data() });
        });
        
        // Sort in client to avoid requiring a composite index in Firestore
        chapters.sort((a, b) => (a.order || 0) - (b.order || 0));
        
        setFetchedChapters(chapters);
      } catch (error) {
        console.error("Error fetching chapters:", error);
      } finally {
        setLoadingChapters(false);
      }
    };
    fetchChapters();
  }, [product.id, isPurchased]);

  const runTest = () => {
    const errors: string[] = [];
    const containers = document.querySelectorAll('.test-page-container');
    
    containers.forEach((container) => {
      const title = container.getAttribute('data-title') || 'Unknown Page';
      const measurer = container.querySelector('.content-measurer');
      
      if (measurer) {
        if (measurer.scrollHeight > measurer.clientHeight + 2) {
          errors.push(title);
        }
      } else {
        if (container.scrollHeight > container.clientHeight + 2) {
          errors.push(title);
        }
      }
    });
    
    setOverflowErrors(errors);
    setHasTested(true);
  };

  useEffect(() => {
    setIsIframe(window !== window.parent);
  }, []);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [currentPage]);

  let pageNum = 4;
  
  let visibleChapters = fetchedChapters.length > 0 ? fetchedChapters : chaptersData;
  if (!isPurchased) {
    visibleChapters = visibleChapters.filter(c => c.isPreview || c.id === 'intro' || c.id === 'chapter1');
  }

  const chapterPages = visibleChapters.flatMap((chapter, index) => {
    const chapterContent = Array.isArray(chapter.content) ? chapter.content : [chapter.content];
    return chapterContent.map((pageContent, pageIndex) => {
      const currentPageNum = pageNum++;
      return {
        id: `${chapter.id}${pageIndex > 0 ? `_pt${pageIndex + 1}` : ''}`,
        title: chapter.number === 'Introduction' || chapter.number === 'Final Thoughts' || chapter.number === 'Conclusion' ? chapter.number : `Chapter ${index}`,
        content: (
          <div className="w-full h-full bg-[#ffffff] font-sans text-[#1A1A1A] flex flex-col">
            {/* Running Header */}
            <div className="px-12 py-8 flex justify-between text-[6.5pt] tracking-[0.15em] uppercase text-[#737373] flex-shrink-0 font-medium">
               <span>{product.name}</span>
               <span className="text-right">{chapter.number === 'Introduction' || chapter.number === 'Conclusion' ? chapter.number : `Chapter ${index}`}</span>
            </div>
            
            <div className="px-12 pt-4 flex-grow flex flex-col content-measurer overflow-y-auto hide-scrollbar">
              {pageIndex === 0 && chapter.title && <span className="block text-[7.5pt] font-bold uppercase tracking-[0.15em] mb-4 text-[#FF4400] flex-shrink-0">{chapter.number}</span>}
              {pageIndex === 0 && chapter.title && (
                <h2 className="text-[20pt] font-bold leading-[1.1] tracking-tight mb-8 whitespace-pre-line flex-shrink-0">
                  {chapter.title}
                </h2>
              )}
              
              <div className="text-[8.5pt] leading-[15pt] text-[#262626] space-y-4 max-w-[90%]">
                {typeof pageContent === 'string' ? (
                  <div className="markdown-body">
                    <Markdown>{pageContent}</Markdown>
                  </div>
                ) : (
                  pageContent
                )}
              </div>
            </div>
            <div className="py-8 mt-auto flex justify-center text-[7pt] text-[#a3a3a3] tracking-widest flex-shrink-0">{currentPageNum}</div>
          </div>
        )
      };
    });
  });

  if (!isPurchased) {
    chapterPages.push({
      id: 'locked',
      title: 'Unlock Full Book',
      content: (
        <div className="w-full h-full bg-[#ffffff] font-sans text-[#1A1A1A] flex flex-col items-center justify-center p-12 text-center">
          <div className="w-12 h-12 mb-6 rounded-full bg-[#f5f5f5] flex items-center justify-center">
            <svg className="w-6 h-6 text-[#a3a3a3]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
          </div>
          <h2 className="text-[14pt] font-bold mb-4">Keep Reading</h2>
          <p className="text-[9pt] text-[#737373] mb-8 max-w-[250px]">
            Purchase the full book to unlock all chapters and download the complete PDF.
          </p>
          <button 
            onClick={onPurchase}
            className="px-6 py-3 bg-[#FF4400] text-white text-[9pt] font-bold uppercase tracking-widest hover:bg-[#ea3e00] transition-colors"
          >
            Buy Now - ${product.price}
          </button>
        </div>
      )
    });
  }

  const pages = [
    {
      id: 'cover',
      title: 'Cover',
      content: (
        <div className="w-full h-full bg-[#111111] flex flex-col items-center justify-center p-12 text-center relative font-sans content-measurer text-white">
          <div className="absolute top-[15%] left-12 w-12 h-1 bg-[#FF4400]"></div>
          <div className="mt-20 text-left w-full">
            <h1 className="text-[3.5rem] font-bold tracking-tighter leading-[1] mb-8 uppercase">
              {product.name}
            </h1>
            <p className="text-[9pt] tracking-[0.15em] text-[#A3A3A3] mb-24 max-w-[200px] uppercase font-medium leading-relaxed">
              {product.description}
            </p>
            <p className="text-[8pt] font-bold tracking-[0.2em] mt-auto text-[#FFFFFF] uppercase">
              {product.author?.name || 'Author'}
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'toc',
      title: 'Contents',
      content: (
        <div className="w-full h-full bg-[#ffffff] p-12 font-sans flex flex-col text-[#1A1A1A] content-measurer">
          <h2 className="text-[9pt] font-bold tracking-[0.15em] uppercase mb-10 flex-shrink-0">Contents</h2>
          <div className="space-y-[10px] text-[8.5pt] leading-[14pt] flex-grow">
            {tocItems.map((item, i) => (
              <div key={i} className="flex items-baseline">
                <span className="text-[#a3a3a3] flex-shrink-0 w-8 font-mono text-[7.5pt]">{String(i + 1).padStart(2, '0')}</span>
                <span className="text-[#1A1A1A] font-medium">{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-auto pt-4 flex justify-center text-[7pt] text-[#a3a3a3] tracking-widest flex-shrink-0">3</div>
        </div>
      )
    },
    ...chapterPages
  ];

  const currentIndex = pages.findIndex(p => p.id === currentPage);
  const currentContent = pages[currentIndex]?.content;

  return (
    <>
      <style>{`
        @media print {
          @page {
            size: 6in 9in;
            margin: 0;
          }
          html, body {
            margin: 0;
            padding: 0;
            background: white;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }
      `}</style>
      {/* Screen View */}
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center font-sans text-[#171717] print:hidden">
        <div className="max-w-6xl w-full flex flex-col md:flex-row h-screen">
        
        {/* Navigation Sidebar */}
        <div className="w-full md:w-64 border-r border-[#e5e5e5] p-8 flex flex-col overflow-y-auto hide-scrollbar">
          <button 
            onClick={onBack}
            className="mb-8 flex items-center text-[10px] uppercase tracking-[0.2em] text-[#a3a3a3] hover:text-[#171717] transition-colors"
          >
            <svg className="w-3 h-3 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Back to Store
          </button>

          <div className="mb-12">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#a3a3a3] mb-8">Navigation</h3>
            <nav className="space-y-4">
              {pages.filter(page => !page.id.includes('_pt')).map((page) => {
                const isActive = currentPage === page.id || currentPage.startsWith(page.id + '_pt');
                return (
                  <button
                    key={page.id}
                    onClick={() => setCurrentPage(page.id)}
                    className={`block w-full text-left text-xs uppercase tracking-widest transition-colors flex items-center group ${
                      isActive 
                        ? 'text-[#000000] font-semibold' 
                        : 'text-[#a3a3a3] hover:text-[#525252]'
                    }`}
                  >
                    <span className={`w-1 h-1 rounded-full mr-3 bg-[#f97316] transition-opacity flex-shrink-0 ${isActive ? 'opacity-100' : 'opacity-0'}`}></span>
                    <span className="truncate">{page.title}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="mt-auto pt-8 border-t border-[#f5f5f5]">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#a3a3a3] mb-4">Print Specs & Tests</h3>
            
            {hasTested && overflowErrors.length > 0 && (
              <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-600 text-[10px] rounded">
                <p className="font-bold mb-1">Overflow Detected!</p>
                <p className="mb-2">The following pages do not fit in 6x9:</p>
                <ul className="list-none space-y-1.5 border-l-2 border-[#FF4400] pl-4 ml-1 text-[#525252]">
                  {overflowErrors.map(err => <li key={err}>{err}</li>)}
                </ul>
              </div>
            )}
            
            {hasTested && overflowErrors.length === 0 && (
              <div className="mb-4 p-3 bg-green-50 border border-green-100 text-green-600 text-[10px] rounded">
                <p className="font-bold">All pages conform to 6x9 layout!</p>
              </div>
            )}

            <button 
              onClick={runTest}
              className="w-full py-2 px-4 mb-3 bg-[#ffffff] text-[#171717] text-[10px] uppercase tracking-[0.1em] hover:bg-[#f5f5f5] transition-colors border border-[#e5e5e5] flex items-center justify-center gap-2"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Run Layout Test
            </button>

            {isIframe ? (
              <div className="space-y-3">
                <p className="text-[10px] text-[#f97316] leading-relaxed">
                  Printing is blocked inside the preview window. Please open the app in a new tab to generate your PDF.
                </p>
                <a 
                  href={window.location.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 bg-[#f97316] text-[#ffffff] text-[10px] uppercase tracking-[0.2em] hover:bg-[#ea580c] transition-colors flex items-center justify-center gap-2 cursor-pointer text-center"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  Open App in New Tab
                </a>
                {isPurchased && product.downloadUrl && (
                  <a 
                    href={product.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 bg-transparent border border-[#171717] text-[#171717] text-[10px] uppercase tracking-[0.2em] hover:bg-[#171717] hover:text-[#ffffff] transition-colors flex items-center justify-center gap-2 text-center"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                    Download Original PDF
                  </a>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                <button 
                  onClick={() => {
                    try {
                      window.print();
                    } catch (e) {
                      console.error('Print failed:', e);
                      alert('Please use your browser\'s print function (Ctrl+P or Cmd+P) to generate the PDF.');
                    }
                  }}
                  className="w-full py-3 px-4 bg-[#171717] text-[#ffffff] text-[10px] uppercase tracking-[0.2em] hover:bg-[#262626] transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                  {isPurchased ? "Generate PDF" : "Generate Sample PDF"}
                </button>
                
                {isPurchased && product.downloadUrl && (
                  <a 
                    href={product.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 bg-transparent border border-[#171717] text-[#171717] text-[10px] uppercase tracking-[0.2em] hover:bg-[#171717] hover:text-[#ffffff] transition-colors flex items-center justify-center gap-2 text-center"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                    Download Original PDF
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Central Viewport */}
        <div className="flex-grow flex flex-col items-center justify-center p-4 md:p-8 bg-[#f5f5f580]">
          <div className="relative group flex flex-col items-center">
            {/* Page Container */}
            <div 
              ref={contentRef}
              className="w-[360px] h-[540px] md:w-[450px] md:h-[675px] bg-[#ffffff] border border-[#e5e5e5] relative overflow-y-auto hide-scrollbar ring-1 ring-[#0000000d]"
            >
              {currentContent}
            </div>

            {/* Subtle Text Controls */}
            <div className="absolute -bottom-12 left-0 right-0 flex justify-between px-2 w-[360px] md:w-[450px]">
              <button 
                disabled={currentIndex === 0}
                onClick={() => setCurrentPage(pages[currentIndex - 1].id)}
                className="text-[10px] uppercase tracking-[0.2em] text-[#a3a3a3] hover:text-[#000000] disabled:opacity-0 transition-colors"
              >
                Previous
              </button>
              <button 
                disabled={currentIndex === pages.length - 1}
                onClick={() => setCurrentPage(pages[currentIndex + 1].id)}
                className="text-[10px] uppercase tracking-[0.2em] text-[#a3a3a3] hover:text-[#000000] disabled:opacity-0 transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* Print View */}
      <div className="hidden print:block w-[6in] bg-[#ffffff] text-[#000000] mx-auto">
        {pages.map((page) => (
          <div key={`print-${page.id}`} className="w-[6in] h-[9in] break-after-page relative bg-[#ffffff] overflow-hidden box-border" style={{ pageBreakAfter: 'always' }}>
             {page.content}
          </div>
        ))}
      </div>

      {/* Hidden Test Container (renders off-screen to measure content) */}
      <div className="fixed top-0 left-0 opacity-0 pointer-events-none z-[-100] overflow-hidden" aria-hidden="true">
        {pages.map((page) => (
          <div key={`test-${page.id}`} data-title={page.title} className="test-page-container w-[6in] h-[9in] bg-white box-border">
            {page.content}
          </div>
        ))}
      </div>
    </>
  );
}
