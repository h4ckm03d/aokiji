<?php get_template_part('templates/page', 'header'); ?>

<?php if (!have_posts()) : ?>
  <div class="alert alert-warning">
    <?php _e('Sorry, no results were found.', 'roots'); ?>
  </div>
  <?php get_search_form(); ?>
<?php endif; ?>

<?php while (have_posts()) : the_post(); ?>
  <?php get_template_part('templates/content', get_post_format()); ?>
<?php endwhile; ?>

<?php if ($wp_query->max_num_pages > 1) : ?>

    <ul class="pager">
      <li class="previous"><?php next_posts_link(__('<i class="mdi-navigation-arrow-back"></i>', 'roots')); ?></li>
      <li class="next"><?php previous_posts_link(__('<i class="mdi-navigation-arrow-forward"></i>', 'roots')); ?></li>
    </ul>

<?php endif; ?>