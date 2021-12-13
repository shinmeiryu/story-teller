import mutations from '@/store/modules/stories/mutations';
import actions from '@/store/modules/stories/actions';
import getters from '@/store/modules/stories/getters';

export default {
  namespaced: true,
  state() {
    return {
      lastFetch: null,
      stories: [
        {
          id: 's1',
          storyTitle: 'The lonely bear',
          author: 'Jeff',
          authorId: '',
          description: 'A bear who lives alone in the forest, who can live independently.',
          categories: ['bedtime'],
          story:
            "Nearby the small forest, lives a bear. Fur as white as snow and the size of a rain barrel. \n" +
            "He goes to town weekly to buy some groceries. The shopkeeper sometimes worries and asks: \n" +
            "'Are you eating well? Are you still healthy? It must be lonely by yourself.' \n" +
            "The bear smiles and says: 'I am alright and I can manage just fine, as long as you give me yummy honey bars.'\n" +
            "The shopkeeper, feeling relieved, hands him his groceries and added some extra honey bars. The bear moves on.\n" +
            "On the way home, he meets a smaller bear. His little sister bear Molly. 'Hello big brother!' she said with her cute voice.\n" +
            "'Hello Molly, how are mum and dad?'. 'They are doing fine, they do miss you sometimes.' The bear laughs. \n" +
            "'I will visit them tomorrow. Here, have a honey bar.'. Molly happily received it and hops her way in a jolly mood. \n" +
            "Finally home, the bear sits in his usual chair and looked outside his window. The breeze gently brushes his fur.\n" +
            "'I am content and happy with my life.'. Peacefully the bear sips his honey tea and looks over the town from his tree house.",
        },
      ]
    }
  },
  mutations,
  actions,
  getters
};