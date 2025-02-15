/* eslint-disable react/no-array-index-key */
import React from 'react';
import { motion } from 'framer-motion';
import { Child } from '@app/types';
import { Box, Heading } from '@chakra-ui/react';

// Word wrapper
const Wrapper = ({ children }: Child) => (
    // We'll do this to prevent wrapping of words using CSS
    <Box as="span" whiteSpace="nowrap">
        {children}
    </Box>
);

type Animate = {
    text: string;
};

// AnimatedCharacters
// Handles the deconstruction of each word and character to setup for the
// individual character animations
export const AnimatedCharacters = ({ text }: Animate) => {
    // Framer Motion variant object, for controlling animation
    const item = {
        hidden: {
            y: '200%',
            color: 'black',
            transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.85 },
        },
        visible: {
            y: 0,
            color: 'black',
            transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.75 },
        },
    };

    //  Split each word of props.text into an array
    const splitWords = text.split(' ');

    // Create storage array
    const words: any = [];

    // Push each word into words array
    // eslint-disable-next-line no-restricted-syntax
    for (const [, items] of splitWords.entries()) {
        words.push(items.split(''));
    }

    // Add a space ("\u00A0") to the end of each word
    words.map((word: any) => word.push('\u00A0'));

    return (
        <Heading fontSize="48px">
            {words.map((_: any, index: number) => (
                // Wrap each word in the Wrapper component
                <Wrapper key={index}>
                    {words[index].flat().map((element: string, indexs: number) => (
                        <span
                            style={{
                                overflow: 'hidden',
                                display: 'inline-block',
                            }}
                            key={indexs}
                        >
                            <motion.span style={{ display: 'inline-block' }} variants={item}>
                                {element}
                            </motion.span>
                        </span>
                    ))}
                </Wrapper>
            ))}
        </Heading>
    );
};
