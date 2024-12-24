import { Card, FeaturedCard } from '@/components/Cards'
import Filters from '@/components/Filters'
import NoResults from '@/components/NoResults'
import Search from '@/components/Search'
import icons from '@/constants/icons'
import { useGlobalContext } from '@/global-provider'
import { getLatestProperties, getProperties } from '@/lib/appwrite'
import { useAppwrite } from '@/lib/useAppwrite'
import { router, useLocalSearchParams } from 'expo-router'
import React, { useEffect } from 'react'
import { ActivityIndicator, FlatList, Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'

const Index = () => {
    const { user } = useGlobalContext();
    const params = useLocalSearchParams<{ query?: string; filter?: string; }>();
    const { data: latestProperties, loading: latestPropertiesLoading } = useAppwrite({ fn: getLatestProperties })
    const { data: properties, loading, refetch } = useAppwrite(
        {
            fn: getProperties,
            params: {
                filter: params.filter!,
                query: params.query!,
                limit: 5
            }
        })

    const handleCardPress = (id: string) => {
        router.push(`/properties/${id}`)
    }

    useEffect(() => {
        refetch({
            filter: params.filter!,
            query: params.query!,
            limit: 6
        })
    }, [params.filter, params.query])
    return (
        <SafeAreaView className="bg-white h-full">
            <FlatList
                data={properties}
                renderItem={({ item }) => <Card onPress={() => handleCardPress(item.$id)} item={item} />}
                keyExtractor={(item) => item.$collectionId.toString()}
                numColumns={2}
                contentContainerClassName="pb-32"
                columnWrapperClassName="flex gap-5 px-5"
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    loading ? (<ActivityIndicator
                        size="large"
                        className="text-primary-300 mt-5" />) : <NoResults />
                }
                ListHeaderComponent
                ={<View className="px-5">
                    <View className="flex flex-row items-center justify-between mt-5">
                        <View className="flex flex-row">
                            <Image
                                source={{ uri: user?.avatar }}
                                className="size-12 rounded-full"
                            />

                            <View className="flex flex-col items-start ml-2 justify-center">
                                <Text className="text-xs font-rubik text-black-100">
                                    Good Morning
                                </Text>
                                <Text className="text-base font-rubik-medium text-black-300">
                                    {user?.name}
                                </Text>
                            </View>
                        </View>
                        <Image source={icons.bell} className="size-6" />
                    </View>
                    <Search />
                    <View className="my-5">
                        <View className="flex flex-row items-center
                            justify-between">
                            <Text className="text-xl font-rubik-bold text-black-300">Featured</Text>
                            <TouchableOpacity>
                                <Text className="text-base font-rubik-bold text-primary-300">
                                    See All
                                </Text>
                            </TouchableOpacity>
                        </View>
                        {
                            latestPropertiesLoading ? <ActivityIndicator
                                size="large" className="text-primary-300 mt-5" /> : !latestProperties || latestProperties?.length === 0 ? <NoResults /> : <FlatList
                                    data={latestProperties}
                                    keyExtractor={(item) => item.$collectionId}
                                    renderItem={({ item }) => <FeaturedCard onPress={() => handleCardPress(item.$id)} item={item} />}
                                    horizontal
                                    bounces={false}
                                    ListEmptyComponent={
                                        loading ? (<ActivityIndicator
                                            size="large"
                                            className="text-primary-300 mt-5" />) : <NoResults />
                                    }
                                    showsHorizontalScrollIndicator={false}
                                    contentContainerClassName="flex gap-5 mt-5"
                                />
                        }
                    </View>



                    <View className="my-5">
                        <View className="flex flex-row items-center
                justify-between">
                            <Text className="text-xl font-rubik-bold text-black-300">Our Recommendation</Text>
                            <TouchableOpacity>
                                <Text className="text-base font-rubik-bold text-primary-300">
                                    See All
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View>
                        <Filters />
                    </View>

                </View>}

            />


        </SafeAreaView>
    )
}


export default Index