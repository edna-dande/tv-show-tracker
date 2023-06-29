import { mount } from '@vue/test-utils';
import TVShowList from "@/views/TVShowlist.vue";

describe('TVShowList.vue', () => {
    it('displays the correct number of shows', () => {
        const shows = [
          { id: 1, title: 'Show 1', name: 'Genre 1' },
          { id: 2, title: 'Show 2', name: 'Genre 2' },
        ];
    
        const wrapper = mount(TVShowList, {
          data() {
            return {
              shows: shows,
            };
          },
        });
    
        const dataCards = wrapper.findAll('.data-card');
        expect(dataCards.length).toBe(shows.length);
  });
});





