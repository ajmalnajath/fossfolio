/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { HomeLayout } from '@app/layout';
import { Card } from '@app/views/events';
import { useRouter } from 'next/router';
import { Flex, Heading } from '@chakra-ui/react';
import axiosHandler from '@app/api';
import { NextPageWithLayout } from './_app';

const Events: NextPageWithLayout = () => {
    const [data, setData] = useState<any>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const router = useRouter();

    const getData = async () => {
        try {
            setIsLoading(true);
            const { data: apiData } = await axiosHandler.get('/user/ViewAllEvents');
            if (!apiData.ok) {
                throw new Error();
            }
            setData(data);
        } catch {
            router.push('/404');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        (async () => {
            await getData();
        })();
    }, []);

    if (isLoading) {
        <h1>loading</h1>;
    }

    return (
        <Flex p="6" flexDir="column">
            <Heading textAlign="center" fontSize="48px">
                Find Hackathons
            </Heading>
            <Flex columnGap="25px" flexWrap="wrap">
                <Card />
                <Card />
                <Card />
            </Flex>
        </Flex>
    );
};

Events.getLayout = (page) => <HomeLayout>{page}</HomeLayout>;

export default Events;
