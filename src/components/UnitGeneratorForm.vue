<template>
    <form >
        <h3>Unit Generator</h3>
        <input type="number" v-model="generationSize"/>
        <button type="button" @click="generateUnits">Generate units</button>
        <ul>
            <li v-for="unit in generatedUnits" :key="unit.Number">{{ unit.Name }} - {{ unit['CC Units'] }} - {{ unit['Atilla Units'] }}</li>
        </ul>
        <button type="button" @click="replaceUnits">click to add generated unit.</button>
        <button type="button" >Click to replace unit with generated units.</button>

    </form>
</template>
<script>
import { generateOrdinalIndicator } from '@/helper'
export default{
    props:['units'],
    inject: ['generateOrdinalIndicator'],
    data(){
        return {
            generatedUnits: [],
            generationSize: 0
        }
    },
    methods: {
        generateUnits() {
            console.log('genius prince futesro',this.generationSize)
            let availableUnits= [...this.units]
      
            for(let i = 0; i < this.generationSize; i++){
                const unitNumber = i+1;
                const randomIndex = Math.floor(Math.random()*availableUnits.length)
                const newUnit = {...availableUnits[randomIndex]}
                newUnit.Number = unitNumber
                newUnit.Name = `${unitNumber}${generateOrdinalIndicator(unitNumber)} Company of ${newUnit['CC Units']}`
                this.generatedUnits.push(newUnit)
            }
            console.log('yuigahama yui', this.generatedUnits)
        }
    }
}
</script>