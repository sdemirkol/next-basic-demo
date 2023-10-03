import React from 'react'
import Image from 'next/image';
import { notFound } from 'next/navigation';
import styles from './styles.module.css'


async function getPost(id) {
    try {
        const response = await fetch(`https://dummyjson.com/posts/${id}`)
        return response.json();
    }
    catch (error) {
        throw new Error(error);
    }
}


export default async function Page({ params }) {
    const { id, title, body } = await getPost(params.id)
    console.log(params);

    if (!title) {
        return notFound()
    }
    return (
        <div className={styles.blogContainer}>
            <div className={styles.cardImage}>
                {/* Cumulative Layout Shift - Kümülatif Düzen Kaymasını engellemek için next.js bizden width ve height bilgilerini istiyor. */}
                <Image
                    src={`https://picsum.photos/200/300?random=${id}`}
                    alt='Blog Card Image'
                    fill
                // width={96}
                // height={96}
                />
            </div>
            <div className={styles.cardBody}>
                <h3>{title}</h3>
                <p>{body}</p>
            </div>
        </div>
    )
}