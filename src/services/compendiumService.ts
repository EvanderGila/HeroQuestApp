import supabase from '@/lib/supabase'

export const compendiumService = {

    async getRaces() {
        const { data, error } = await supabase
            .from('races')
            .select(`*`)
            .order('name', { ascending: true })
        
        if (error) throw error
        return data
    },

    async getRacesDetailed() {
        const { data, error } = await supabase
            .from('races')
            .select(`
            *,
            race_abilities (
                required_lvl,
                abilities (*)
            )
            `)
            .order('name', { ascending: true })
        
        if (error) throw error
        return data
    },

    async getRaceById(id:number) {
        const { data, error } = await supabase
            .from('races')
            .select(`
            *,
            race_abilities (
                required_lvl,
                abilities (*)
            )
            `)
            .eq('id', id)
            .order('name', { ascending: true })
            .single()
        
        if (error) throw error
        return data
    },


    async getClasses() {
        const { data, error } = await supabase
            .from('classes')
            .select(`*`)
            .order('name', { ascending: true })
        
        if (error) throw error
        return data
    },

    async getClassesDetailed() {
        const { data, error } = await supabase
            .from('classes')
            .select(`
            *,
            class_abilities (
                required_lvl,
                abilities (*)
            ),
            class_spells (
                required_lvl,
                spells (*)
            )
            `)
            .order('name', { ascending: true })
        
        if (error) throw error
        return data
    },
    
    async getClassById(id:number) {
        const { data, error } = await supabase
            .from('classes')
            .select(`
            *,
            class_abilities (
                required_lvl,
                abilities (*)
            ),
            class_spells (
                required_lvl,
                spells (*)
            )
            `)
            .eq('id', id)
            .order('name', { ascending: true })
            .single()
        
        if (error) throw error
        return data
    },

    async getAbilities() {

        const { data, error } = await supabase
        .from('abilities')
        .select('*')
        .order('name')

        if(error) throw error

        return data
    },

    async getAbilitiesById(id:number) {

        const { data, error } = await supabase
        .from('abilities')
        .select(`
            *,
            class_abilities (
                required_lvl,
                classes (id, name)
            ),
            race_abilities (
                required_lvl,
                races (id, name)
            ),
            `)
        .eq('id', id)
        .order('name')
        .single()

        if(error) throw error

        return data
    },



    async getSpells() {

        const { data, error } = await supabase
        .from('spells')
        .select('*')
        .order('name')

        if(error) throw error

        return data
    },

    async getSpellsById(id:number) {

        const { data, error } = await supabase
        .from('spells')
        .select(`
            *,
            class_spells (
                required_lvl,
                classes (id, name)
            ),
            `)
        .eq('id', id)
        .order('name')
        .single()

        if(error) throw error

        return data
    },

    async getItems() {

        const { data, error } = await supabase
        .from('items')
        .select('*')
        .order('name')

        if(error) throw error

        return data
    },

    async getItemById(id:number){

        const { data, error } = await supabase
        .from('items')
        .select('*')
        .eq('id', id)
        .order('name')
        .single()

        if(error) throw error

        return data
    }
}