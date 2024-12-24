import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { categories } from '@/constants/data';

const Filters = () => {
    const params = useLocalSearchParams<{ filter?: string }>();
    const [selectedCategort, setSelectedCategory] =
        useState(params.filter || "All")


    const handleCategoryPress = (category: string) => {

    }

    return (
        <ScrollView horizontal
            showsHorizontalScrollIndicator={false} className="mt-3 mb-2">
            {
                categories.map((item, index) => (
                    <TouchableOpacity key={index} onPress={() => handleCategoryPress(item.category)} className="flex flex-col items-start mr-3 px-4 py-2 rounded-fulls">
                        <Text>{item.title}</Text>
                    </TouchableOpacity>
                ))
            }
        </ScrollView>
    )
}

export default Filters