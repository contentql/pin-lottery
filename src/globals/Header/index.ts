import { GlobalConfig } from 'payload/types'

export const Header: GlobalConfig = {
  slug: 'header',
  fields: [
    {name:'icon',type:'upload',relationTo:'media',label:'Icon',required:true},
    {
        name:'nav_links',
        type:'array',
        fields:[
            {
                type:'row',
                fields:[
                    {name:'name',type:'text',label:'name',required:true},
                    {name:'link',type:'text',label:'Link',required:true},
                ]
            }
        ]
    }
  ],
}
