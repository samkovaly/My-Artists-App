import React from 'react';

import { ScrollView, StyleSheet } from 'react-native';

import { Colors, Screens} from '../../styles'
import BaseText from '../../components/BaseText'

export default function TermsOfUse(props) {


    return (
      <ScrollView style = {styles.container}>

            <BaseText style = {styles.text}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque semper pretium libero eget commodo. Vivamus id auctor nunc. Cras cursus quis ipsum id fringilla. Proin in malesuada mauris. Aliquam venenatis ullamcorper dui at aliquam. Praesent vestibulum, felis quis consequat convallis, justo odio lobortis arcu, et luctus ligula ligula a neque. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec tristique velit nec mollis scelerisque. Integer justo tellus, malesuada non bibendum eget, dictum quis mauris. Nulla dignissim, diam vitae suscipit pharetra, enim nisi facilisis massa, efficitur semper nunc justo tempor erat.

Mauris sit amet euismod massa. Praesent fringilla turpis eget ligula viverra placerat eget a odio. Etiam a molestie lectus. Sed nulla nunc, maximus non neque vitae, aliquam eleifend lectus. Aenean quis efficitur ligula, at dictum lacus. Nullam tristique mi sapien, et tempus justo sollicitudin nec. Ut at elementum augue, eget faucibus mi. In blandit felis quis diam varius, sit amet posuere dolor maximus. Quisque arcu nulla, semper in urna et, pretium ornare enim. Ut nec dictum elit, a gravida massa. Cras et suscipit est. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vivamus varius odio a sapien fringilla, et volutpat mi pharetra.

Maecenas eleifend diam at nisi lobortis pellentesque. Maecenas ullamcorper arcu et nisl congue pellentesque. Duis ac ex maximus, mattis velit nec, mollis massa. Nunc malesuada tempus neque, efficitur gravida mi volutpat in. Nunc posuere tempor dapibus. Sed ac cursus quam. Etiam ipsum nulla, convallis ac viverra vitae, tincidunt non massa. Donec vitae bibendum ipsum. Etiam fermentum lacus sed nulla malesuada placerat. Aliquam facilisis quis ligula sit amet cursus. Quisque in nulla lectus. Quisque ut commodo magna.

Duis consectetur faucibus mi nec congue. Duis volutpat facilisis ultrices. Ut odio elit, mollis id pretium nec, aliquet sit amet tortor. In pretium mauris vel sapien rhoncus, sit amet ultricies arcu mattis. Etiam venenatis tincidunt finibus. Pellentesque sed odio neque. Pellentesque quis accumsan lorem, a interdum lorem. Interdum et malesuada fames ac ante ipsum primis in faucibus. Proin eget risus lacinia, pulvinar diam eu, commodo ex. Etiam tincidunt at libero non hendrerit. Quisque eget congue velit. Aenean ullamcorper malesuada convallis. Pellentesque nec efficitur diam. Etiam sed ultrices urna, at accumsan augue. Quisque congue neque lectus, vitae laoreet massa vehicula ac. Proin blandit dolor quis magna maximus feugiat.

Fusce fermentum, ante facilisis iaculis faucibus, velit erat luctus diam, nec bibendum dolor ex eget nibh. Phasellus pulvinar tortor et felis lobortis ultrices. In tortor ante, sodales ut placerat non, interdum non quam. Morbi placerat, dui id sollicitudin tristique, neque quam sodales magna, ut tempus lorem ante eget augue. Integer et volutpat orci. Curabitur condimentum ut ligula in euismod. Maecenas id lacus massa. Vivamus maximus consectetur vestibulum. Maecenas vel ligula nec elit posuere tincidunt nec vitae velit. In vestibulum imperdiet lacus nec tincidunt.
            </BaseText>

      </ScrollView>
    );
}


const styles = StyleSheet.create({
  container: {
    ...Screens.screenContainer,
    padding: 20,
  },
  text: {
      fontSize: 16,
  }
})