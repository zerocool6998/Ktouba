import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import firebaseConfig from './firebase-applet-config.json';
import { PRODUCTS } from './constants';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

async function populate() {
  try {
    const product = PRODUCTS[0];
    
    // Add book
    await setDoc(doc(db, 'books', product.id), {
      title: product.name,
      description: product.description,
      author: product.author?.name || 'Unknown',
      price: product.price,
      coverUrl: product.imageUrl
    });
    console.log('Book added');

    // Add chapters
    const chapters = [
      {
        id: 'chap1',
        bookId: product.id,
        number: 'Introduction',
        title: 'Why Minimalism Matters',
        content: `We live in the most visually crowded digital environment in history. Every interface competes for attention with notifications, advertisements, social feeds, and messaging apps.

The modern user is overwhelmed. In this environment, **clarity becomes valuable.**

Minimalist design is the discipline of removing everything that does not help the user accomplish their goal. It is not about empty screens or aesthetic trends. It is about **focus.**

A good minimalist interface allows users to:
- understand information faster
- navigate with less effort
- focus on meaningful actions
- experience calm instead of overload

Minimalism transforms complexity into clarity.

In this book you will learn how minimalist design works in practice, including whitespace systems, typography hierarchy, color management, and practical workflows.

Minimalism is not about having less. It is about making **every element matter more.**`,
        order: 1,
        isPreview: true
      },
      {
        id: 'chap2',
        bookId: product.id,
        number: 'Chapter One',
        title: 'The Philosophy of Minimalism',
        content: `Minimalism originally emerged in **art and architecture**, where creators began rejecting decorative excess.

Artists reduced their work to essential shapes and structures. Architects removed ornamentation and focused on function.

Digital design adopted this philosophy.

Minimalist design rests on three core principles:

**1. Clarity**
Users should immediately understand an interface. Confusion is a design failure.

**2. Function First**
Design exists to serve usability. A beautiful interface that frustrates users is not successful design.

**3. Intentional Design**
Every element must justify its existence. A minimalist designer constantly asks:
- Does this help the user?
- Does it improve clarity?
- Is it necessary?

If the answer is no, the element should disappear.

Minimalism is not a style. It is a **decision-making philosophy.**`,
        order: 2,
        isPreview: true
      },
      {
        id: 'chap3',
        bookId: product.id,
        number: 'Chapter Two',
        title: 'Essentialism in Practice',
        content: '# Chapter Two\n\nEssentialism is not about getting more things done; it is about getting the right things done.',
        order: 3,
        isPreview: false
      },
      {
        id: 'chap4',
        bookId: product.id,
        number: 'Chapter Three',
        title: 'The Art of Saying No',
        content: '# Chapter Three\n\nSaying no is a superpower. It protects your time and energy for what truly matters.',
        order: 4,
        isPreview: false
      }
    ];

    for (const chapter of chapters) {
      await setDoc(doc(db, 'chapters', chapter.id), chapter);
      console.log(`Chapter ${chapter.number} added`);
    }

    console.log('Database populated successfully!');
  } catch (error) {
    console.error('Error populating database:', error);
  }
}

populate();
